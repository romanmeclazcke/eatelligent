import { Injectable } from '@nestjs/common';
import { commentRepositorySequelize } from '../infrastructure/repository/comment.repository.sequelize';
import { commentCreateDto } from '../domain/dto/comment.create.dto';
import { commentUpdateDto } from '../domain/dto/comment.update.dto';
import { commentEntity } from '../domain/comment.entity';
import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { badWordsService } from 'src/Shared/infrastructure/IAtext/bad.word.service';

@Injectable()
export class commentUseCases {
  constructor(
    private commentRepository: commentRepositorySequelize,
    private userRepository: userRepositorySequelize,
    private postRepository: postRepositorySequelize,
    private readonly badWordsServices: badWordsService,
  ) {}

  async addComment(
    userId: string,
    postId: string,
    commentCreateDto: commentCreateDto,
  ): Promise<Result<commentEntity>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) return Result.failure('User not found', 404);

    const post = await this.postRepository.getPostById(postId);

    if (!post) return Result.failure('Post not found', 404);

    const badWordsResult = await this.badWordsServices.detectBadWords(
      commentCreateDto.comment,
    );

    if (badWordsResult) {
      //aplciar la traduccion de ingles a español
      return Result.failure('Comment contains bad words', 400);
    }

    const commentCreated = await this.commentRepository.addComment(
      userId,
      postId,
      commentCreateDto,
    );

    if (commentCreateDto) return Result.succes(commentCreated, 201);

    return Result.failure('Internal server error', 500);
  }

  async deleteComment(
    userId: string,
    commentId: string,
  ): Promise<Result<string>> {
    const commentDeleted = await this.commentRepository.deleteComment(
      userId,
      commentId,
    );
    if (commentDeleted > 0) {
      return Result.succes('Comment deleted', 200);
    }
    return Result.failure('Comment not found', 404);
  }
  async updateComment(
    userId: string,
    commentId: string,
    commentUpdateDto: commentUpdateDto,
  ): Promise<Result<commentEntity>> {
    const commentToUpdate: commentUpdateDto = {
      ...commentUpdateDto,
      status: true,
    };

    const badWordsResult = await this.badWordsServices.detectBadWords(
      commentUpdateDto.comment,
    );

    if (badWordsResult) {
      //aplciar la traduccion de ingles a español
      return Result.failure('Comment contains bad words', 400);
    }
    const commentUpdated = await this.commentRepository.updateComment(
      userId,
      commentId,
      commentToUpdate,
    );

    if (commentUpdated) return Result.succes(commentUpdated, 200);

    return Result.failure('Comment not found', 404);
  }
}
