import { likeEntity } from "src/Like/domain/like.entity";
import { likeRepository } from "src/Like/domain/like.repository";
import Like from "../model/like.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class likeRepositorySequelize implements likeRepository{
     
    async likePost(userId: string, postId: string): Promise<likeEntity> {
        return await Like.create({
            userId: userId,
            postId: postId

        })
    }
    async dislikePost(userId: string, postId: string): Promise<number> {
        return await Like.destroy({
            where: {
                userId: userId,
                postId: postId

            }
        })
    }

    async findLike(userId: string, postId: string): Promise<likeEntity | null> {
        return await Like.findOne({
            where:{
                userId:userId,
                postId:postId
            }
        })
    }

}