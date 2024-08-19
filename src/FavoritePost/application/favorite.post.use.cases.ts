import { Injectable, Res } from "@nestjs/common";
import { favoritePostRepositorySequelize } from "../infrastructure/repository/favorite.post.repository.prisma";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { favoritePostEntity } from "../domain/favorite.post.entity";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { postRepositorySequelize } from "src/Post/infrastructure/repository/post.repository.sequelize";


@Injectable()
export class favoritePostUseCases{

    constructor(private favoritePostRepository:favoritePostRepositorySequelize, private userRespository:userRepositorySequelize, private postRepository:postRepositorySequelize){}


    async getFavoritePost(userId:string):Promise<Result<favoritePostEntity[]|null>>{
        const user = await this.userRespository.getUserById(userId);

        if(!user){
            return Result.failure("User not found",404)
        }

        const favoritePost= await this.favoritePostRepository.getFavoritePost(userId)

        if(favoritePost.length>0){
            return Result.succes(favoritePost,200);
        }
        return Result.failure("Favorite post not found",404)
    
    }

    async addFavoritePost(userId:string,postId:string):Promise<Result<favoritePostEntity|null>>{
            const post= await this.postRepository.getPostById(postId);


            if(!post){
                return Result.failure("Post not exists",404)
            }

            const user = await this.userRespository.getUserById(userId);

            if(!user){
                return Result.failure("User not found",404)
            }

            const favoritePostAdded= await this.favoritePostRepository.addFavoritePost(userId,postId);

            if(favoritePostAdded){
                return Result.succes(favoritePostAdded,201);
            }
            return Result.failure("Internal server error",500);
    }

    
    async deleteFavoritePost(favoritePostId:string):Promise<Result<string|null>>{
        const favoritePostDeleted= await this.favoritePostRepository.deleteFavoritePost(favoritePostId)

        if(favoritePostDeleted>0){
            return Result.succes("successfully removed",201);
        }
        return Result.failure("Internal server error",500);
    }
    
}