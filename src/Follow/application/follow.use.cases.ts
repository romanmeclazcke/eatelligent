import { Injectable } from "@nestjs/common";
import { followRepositorySequelize } from "../infrastructure/repository/follow.repository.sequelize";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { followEntity } from "../domain/follow.entity";

@Injectable()
export class followUseCases{

    constructor(private followRepository: followRepositorySequelize){}



    async followUser(followerId:string, followedId:string):Promise<Result<followEntity>>{
        const findFollower=true
        const findFollowed=true;
        
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
        const findFollower=true
        const findFollowed=true;
        
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
}