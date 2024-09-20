import { Injectable, Res } from "@nestjs/common";
import { followRepositorySequelize } from "../infrastructure/repository/follow.repository.sequelize";
import { Result } from "src/Shared/infrastructure/patternResult/result";
import { followEntity } from "../domain/follow.entity";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { followStatsEntity } from "../domain/follow.stats.entity";

@Injectable()
export class followUseCases{

    constructor(private followRepository: followRepositorySequelize, private userRepository: userRepositorySequelize){}
    

    async followUser(followerId:string, followedId:string):Promise<Result<followEntity>>{
        const findFollower= await this.userRepository.getUserById(followerId);
        const findFollowed= await this.userRepository.getUserById(followedId);
        
        if(!findFollower||!findFollowed){
            return Result.failure("One of user not exist",404);
        }

        const following = await this.followRepository.findIfFollow(followerId,followedId);

        if(following){
            return Result.failure("You already follow this user",404);
        }

        const followed= await this.followRepository.followUser(followerId,followedId);

        if(followed){
            return Result.succes(followed,201);
        }
        return Result.failure("Internal server error",500)

    }

    
    async unFollowUser(followerId:string, followedId:string):Promise<Result<number>>{
        const findFollower= await this.userRepository.getUserById(followerId);
        const findFollowed= await this.userRepository.getUserById(followedId);
        
        if(!findFollower||!findFollowed){
            return Result.failure("One of user not exist",404);
        }

        const following = await this.followRepository.findIfFollow(followerId,followedId);

        if(!following){
            return Result.failure("You dont follow a user",404);
        }

        const followed= await this.followRepository.unFollowUser(followerId,followedId);

        if(followed){
            return Result.succes(followed,201);
        }
        return Result.failure("Internal server error",500)
    }

    async getListOfFollowers(userId:string):Promise<Result<followEntity[]>>{
        const findUser = await this.userRepository.getUserById(userId);

        if(!findUser){
            return Result.failure("User not found",404);
        }

        const followers = await this.followRepository.getListOfFollowers(userId)

        return Result.succes(followers,200);
    }


    async getListOfFolloweds(userId:string):Promise<Result<followEntity[]>>{
        const findUser = await this.userRepository.getUserById(userId);

        if(!findUser){
            return Result.failure("User not found",404);
        }

        const followers = await this.followRepository.getListOfFolloweds(userId);

        return Result.succes(followers,200);
    }

    async getFollowStats(userId):Promise<Result<followStatsEntity|null>>{
        const findUser = await this.userRepository.getUserById(userId);

        if(!findUser){
            return Result.failure("User not found",404);
        }
        
        const stats= await this.followRepository.getFollowStats(userId)

        if(stats) return Result.succes(stats,200);

        return Result.failure("Internal server error",500);
    }
}