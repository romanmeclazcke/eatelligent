import { Injectable } from "@nestjs/common";
import { likeRepositorySequelize } from "../infrastructure/repository/like.repository.sequelize";
import { likeEntity } from "../domain/like.entity";
import { Result } from "src/Shared/infrastructure/patternResult/result";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { postRepositorySequelize } from "src/Post/infrastructure/repository/post.repository.sequelize";


@Injectable()
export class likeUseCases{

    constructor(private likeRepository:likeRepositorySequelize,private userRepository:userRepositorySequelize,private postRepostory:postRepositorySequelize){}


    async giveLike(userId:string, postId:string):Promise<Result<likeEntity>>{
        const user = await this.userRepository.getUserById(userId);
        if(!user){
            return Result.failure('User not found',404);
        }
        
        const post = await this.postRepostory.getPostById(postId);
        if(!post){
            return Result.failure('Post not found',404);
        }

        const existLike = await this.likeRepository.findLike(userId,postId);

        if(existLike){
            return Result.failure("User already gave like",404)
        }

        const like = await this.likeRepository.likePost(userId, postId); //REVISAR HAY ERROR
    
        if(like){
            return Result.succes(like,200);
        }
        
        return Result.failure("error to give a like",500);

    }

    async dislikePost(userId:string, postId:string):Promise<Result<number>>{
        const user = await this.userRepository.getUserById(userId);
        
        if(!user){
            return Result.failure('User not found',404);
        }
        
        const post = await this.postRepostory.getPostById(postId)
        
        if(!post){
            return Result.failure('Post not found',404);
        }

        
        const like = await this.likeRepository.dislikePost(userId, postId);

        if(like){
            return Result.succes(like,200);
        }
        
        return Result.failure("error to give a like",500);

    }
}