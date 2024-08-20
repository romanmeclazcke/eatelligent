import { postCreateDto } from 'src/Post/domain/dto/post.create.dto';
import { postUpdateDto } from 'src/Post/domain/dto/post.update.dto';
import { postEntity } from 'src/Post/domain/post.entity';
import { postRepository } from 'src/Post/domain/post.repository';
import Post from 'src/Post/infrastructure/model/post.model';
import { Op } from 'sequelize';
import User from 'src/user/infrastructure/models/user.models';
import Follow from 'src/Follow/infrastructure/model/follow.model';
import Like from 'src/Like/infrastructure/model/like.model';
import Comment from 'src/Comment/infrastructure/model/comment.model';
import { sequelize } from 'src/shared/infrastructure/db/db.sequelize.config';


export class postRepositorySequelize implements postRepository {
  async getPostsFromUsersIFollow(userId: string): Promise<postEntity[] | null> {
    const followedUserIds = await this.getUsersIFollow(userId);

    if (followedUserIds.length === 0) {
      return []; // No hay usuarios seguidos, entonces no hay posts.
    }

    return await Post.findAll({
      where: {
        userId: {
          [Op.in]: followedUserIds,
        },
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name'],
        },{
          model: Comment,
          as:'comments',
          attributes:['id','comment','status','commentedAt'],
          include: [
            {
              model: User,
              as: 'userCommentedPost',
              attributes: ['id','userName'], 
            },
          ],
          order:[['commentedAt','DESC']]
          
        }
      ], attributes: [
        'id',
        'description',
        'image',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM \`Like\`
            WHERE \`Like\`.postId = Post.id 
          )`),
          'likeCount',
        ],
      ],
      //al tener problemas dado que la tabla se llama igual que el metodo like de sql tuve que agregar la barra invertida para que like sea un identificador y no una palabra reservada
      order: [['createdAt', 'DESC']],
    });
  }

  async getPostById(id: string): Promise<postEntity | null> {
    return await Post.findByPk(id)
  }
  async getPostByUser(userId: string): Promise<postEntity[] | null> {
    return await Post.findAll({
      where: {
        userId: userId,
      },
    });
  }
  async createPost(
    userId: string,
    postCreateDto: postCreateDto,
  ): Promise<postEntity | null> {
    return await Post.create({
      ...postCreateDto,
      userId: userId,
    });
  }

  async editPost(
    userId: string,
    id: string,
    postUpdateDto: postUpdateDto,
  ): Promise<postEntity | null> {
    const [affectedRows] = await Post.update(postUpdateDto, {
      where: {
        id: id,
        userId: userId,
      },
    });

    if (affectedRows == 0) {
      return null;
    }

    return await this.getPostById(id);
  }
  async deletePost(userId: string, id: string): Promise<number | null> {
    return await Post.destroy({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  async getUsersIFollow(userId: string): Promise<string[]> {
    const userIfollow = await Follow.findAll({
      attributes: ['followedId'],
      where: {
        followerId: userId,
      },
    });
    const extractProperties = userIfollow.map((follow) => follow.followedId);
    return extractProperties;
  }

  async countLikes(idPost: string): Promise<number> {
    return await Like.count({
      where: {
        postId: idPost,
      },
    });
  }

  async findPost(userId: string, id: string): Promise<postEntity | null> {
    return await Post.findOne({
      attributes: ['id'],
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
