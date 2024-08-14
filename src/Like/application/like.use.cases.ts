import { Inject, Injectable } from "@nestjs/common";
import { likeRepositorySequelize } from "../infrastructure/repository/like.repository.sequelize";
import { likeEntity } from "../domain/like.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";


@Injectable()
export class likeUseCases{

    constructor(private likeRepository:likeRepositorySequelize){}


    async giveLike(userId:string, postId:string):Promise<Result<likeEntity>>{
        console.log(userId,postId)
        const like = await this.likeRepository.likePost(userId, postId); //REVISAR HAY ERROR
    
        if(like){
            return Result.succes(like,200);
        }
        
        return Result.failure("error to give a like",500);

    }

    async dislikePost(userId:string, postId:string):Promise<Result<number>>{
        const like = await this.likeRepository.dislikePost(userId, postId);

        if(like){
            return Result.succes(like,200);
        }
        
        return Result.failure("error to give a like",500);

    }
}