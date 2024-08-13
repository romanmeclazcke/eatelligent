import { postCreateDto } from 'src/Post/domain/dto/post.create.dto';
import { postUpdateDto } from 'src/Post/domain/dto/post.update.dto';
import { postEntity } from 'src/Post/domain/post.entity';
import { postRepository } from 'src/Post/domain/post.repository';
import Post from 'src/Post/infrastructure/model/post.model';
import { Op } from 'sequelize';
import User from 'src/user/infrastructure/models/user.models';

export class postRepositorySequelize implements postRepository {
  async getPostsFromUsersIFollow(userId: string): Promise<postEntity[] | null> {
    //    return await Post.findAll({
    //     where:{
    //         userId:{
    //             [Op.in]:this.getUsersIFollow(userId)
    //         }
    //     },
    //     include: [{
    //     model: User,
    //     as: 'author', //nombre de la relacion
    //     attributes: ['id', 'name'],
    //     }],
    //    })
    throw new Error('Method not implemented.');
  }

  async getPostById(id: string): Promise<postEntity | null> {
    throw new Error('Method not implemented.');
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

  // async getUsersIFollow(userId: string): string[] {
  //     throw new Error("Method not implemented.");
  // }

  // async countLikes(idPost:string):number {
  //     return await Likes.Count({   //dejar asi hasta crear entity like
  //         where:{
  //             idPost:idPost
  //         }
  //     })
  // }

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
