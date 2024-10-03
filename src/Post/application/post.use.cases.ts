import { Injectable } from '@nestjs/common';
import { postRepositorySequelize } from '../infrastructure/repository/post.repository.sequelize';
import { postEntity } from '../domain/post.entity';
import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { postUpdateDto } from '../domain/dto/post.update.dto';
import { postCreateDto } from '../domain/dto/post.create.dto';
import { CloudinaryService } from 'src/Shared/infrastructure/cloudinary/cloudinary.service';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { badWordsService } from 'src/Shared/infrastructure/IAtext/bad.word.service';
import { SightEngineServices } from 'src/Shared/infrastructure/IAimage/sight.engine.service';

@Injectable()
export class postUsesCases {
  constructor(
    private postRepository: postRepositorySequelize,
    private cloudinary: CloudinaryService,
    private userRepository: userRepositorySequelize,
    private badWordsServices : badWordsService,
    private imageServices: SightEngineServices
  ) {}

  async getPostsFromUsersIFollow(
    userId: string,
  ): Promise<Result<postEntity[]>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }
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

  async getPostByUser(userId: string): Promise<Result<postEntity[] | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }

    const posts = await this.postRepository.getPostByUser(userId);
    if (posts.length > 0) {
      return Result.succes(posts, 200);
    }

    return Result.failure('Post not found', 404);
  }

  async createPost(
    userId: string,
    postCreateDto: postCreateDto,
    file: Express.Multer.File,
  ): Promise<Result<postEntity | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }
    
    if(postCreateDto.description){
        if(await this.badWordsServices.detectBadWords(postCreateDto.description)){
          return Result.failure("Post contain bad words",404);
        }  
    }

    const postPictureUrl = await this.handleProfilePictureUpload(file, "post");
    if (postPictureUrl === 'prohibited') return Result.failure('Prohibited content', 400);
    if (postPictureUrl === 'uploadError') return Result.failure('Failed to upload image', 500);

    const postToCreate: postCreateDto = {
      ...postCreateDto,
      image: postPictureUrl,
    };

    const post = await this.postRepository.createPost(userId, postToCreate);

    if (post) {
      return Result.succes(post, 201);
    }

    return Result.failure('Internal server error', 500);
  }

  async editPost(
    userId: string,
    id: string,
    postUpdateDto: postUpdateDto,
    file: Express.Multer.File,
  ): Promise<Result<postEntity | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }

    const {image: oldImgeUrl}= await this.postRepository.getPostById(id);
    
    if(postUpdateDto.description){
      if(await this.badWordsServices.detectBadWords(postUpdateDto.description)){
        return Result.failure("Post contain bad words",404);
      }  
    }
    const postPictureUrl = await this.handleProfilePictureUpload(file,"post");
    if (postPictureUrl === 'prohibited') return Result.failure('Prohibited content', 400);
    if (postPictureUrl === 'uploadError') return Result.failure('Failed to upload image', 500);

    const postToUpdated: postUpdateDto = {
      ...postUpdateDto,
      image: postPictureUrl,
    };

    const postUpdated = await this.postRepository.editPost(
      userId,
      id,
      postToUpdated,
    );

    if (!postUpdated) {
      return Result.failure('Internal server error', 500);
    }
    if(oldImgeUrl){
      console.log(this.cloudinary.deleteImage(oldImgeUrl));
    }
    return Result.succes(postUpdated, 200);
  }

  async deletePost(
    userId: string,
    id: string,
  ): Promise<Result<string | null>> {
    const postDeleted = await this.postRepository.deletePost(userId, id);
  
    if (postDeleted) {
      return Result.succes("Post succesfully deleted", 200);
    }
    return Result.failure('Internal server error', 500);
  }

  private async handleProfilePictureUpload(file: Express.Multer.File,folder:string): Promise<string | 'prohibited' | 'uploadError'> {
    if (!file) return null;
    try {
      const uploadResult = await this.cloudinary.uploadImage(file,folder);
      const profilePictureUrl = uploadResult.url;
  
      const resultDetection = await this.imageServices.detectImage(profilePictureUrl);
      if (!resultDetection.isSucces) {
        await this.cloudinary.deleteImage(profilePictureUrl);
        return 'prohibited';
      }
  
      return profilePictureUrl;
    } catch (error) {
      return 'uploadError';
    }
  }
}
