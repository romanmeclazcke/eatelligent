import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { profileEntity } from '../domain/profile.entity';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { followRepositorySequelize } from 'src/Follow/infrastructure/repository/follow.repository.sequelize';
import { postRepositorySequelize } from 'src/Post/infrastructure/repository/post.repository.sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class showProfileUseCases {
  constructor(private userRepository: userRepositorySequelize,private followRepository:followRepositorySequelize, private postRepository:postRepositorySequelize) {}

  async showProfile(userId: string): Promise<Result<profileEntity>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) return Result.failure('User not found', 404);


    const [followStats, posts]= await Promise.all([ //reduced execution time
        this.followRepository.getFollowStats(userId),
        this.postRepository.getPostByUser(userId)
    ])

    if(!followStats||!posts) return  Result.failure("Internal server error",500);

    const result={
    id:userId, 
    user, 
    followStats: followStats,
    posts:posts
    }

    return Result.succes(result,200);
  }
}
