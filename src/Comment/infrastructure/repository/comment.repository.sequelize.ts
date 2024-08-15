import { Injectable } from '@nestjs/common';
import { commentEntity } from 'src/Comment/domain/comment.entity';
import { commentRepository } from 'src/Comment/domain/comment.repository';
import { commentCreateDto } from 'src/Comment/domain/dto/comment.create.dto';
import { commentUpdateDto } from 'src/Comment/domain/dto/comment.update.dto';
import Comment from '../model/comment.model';
import { commentUseCases } from 'src/Comment/application/comment.use.cases';

@Injectable()
export class commentRepositorySequelize implements commentRepository {
  async addComment(
    userId: string,
    postId: string,
    commentCreateDto: commentCreateDto,
  ): Promise<commentEntity | null> {
    return await Comment.create({
      ...commentCreateDto,
      userId: userId,
      postId: postId,
    });
  }
  async updateComment(
    userId: string,
    commentId: string,
    commentUpdateDto: commentUpdateDto,
  ): Promise<commentEntity | null> {
    const commenUpdated = await Comment.update(
      { ...commentUpdateDto, status: true },
      {
        where: {
          id: commentId,
        },
      },
    );

    if (commenUpdated.length > 0) {
      return await this.findCommentById(commentId);
    }
    return null;
  }

  async deleteComment(userId: string, commentId: string): Promise<number> {
    return await Comment.destroy({
      where: {
        id: commentId,
      },
    });
  }

  async findCommentById(commentId: string): Promise<commentEntity | null> {
    return await Comment.findByPk(commentId);
  }

  async isYourComment(userId: string, commentId: string): Promise<boolean> {
    const owner = await Comment.findOne({
        where: {
            id: commentId,
            userId:userId
        }
    })

    return owner ? true : false;
  }
}
