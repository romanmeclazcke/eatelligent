import { Injectable } from '@nestjs/common';
import { postRepositorySequelize } from '../infrastructure/repository/post.repository.sequelize';
import { postEntity } from '../domain/post.entity';
import { Result } from 'src/shared/infrastructure/patternResult/result';
import { postUpdateDto } from '../domain/dto/post.update.dto';
import { UserEntity } from 'src/user/domian/user.entity';
import { postCreateDto } from '../domain/dto/post.create.dto';

@Injectable()
export class postUsesCases {
  constructor(private postRepository: postRepositorySequelize) {}

  async getPostsFromUsersIFollow(
    userId: string,
  ): Promise<Result<postEntity[]>> {
    const posts = await this.postRepository.getPostsFromUsersIFollow(userId);

    if (posts) {
      return Result.succes(posts, 200);
    }
    return Result.failure('Your follow dont post again', 404);
  }

  async getPostById(postId: string): Promise<Result<postEntity>> {
    const post = await this.postRepository.getPostById(postId);

    if (post) {
      return Result.succes(post, 200);
    }
    return Result.failure('Post not found', 404);
  }

  async getPostByUser(userId: string): Promise<Result<postEntity[] | null>>{
    const posts = await this.postRepository.getPostByUser(userId);
    if (posts.length > 0) {
      return Result.succes(posts, 200); 
    }
    
    return Result.failure('Post not found', 404);
  }

  async createPost(userId: string, postCreateDto: postCreateDto,file: Express.Multer.File): Promise<Result<postEntity | null>> {
    return null
  }

  async editPost(userId:string, id:string,postUpdateDto:postUpdateDto,file: Express.Multer.File):Promise<Result<UserEntity|null>>{
    return null
  }

  async deletePost(userId:string, id:string):Promise<Result<postEntity|null>>{
    return null
  }
}
