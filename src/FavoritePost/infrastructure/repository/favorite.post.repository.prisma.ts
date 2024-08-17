import { favoritePostRepository } from "src/FavoritePost/domain/favorite.post.repository";
import { favoritePostEntity } from "src/FavoritePost/domain/favorite.post.entity";
import FavoritePost from "../model/favoritePost.model";


export class favoritePostRepositorySequelize implements favoritePostRepository{
    
    
    async getFavoritePost(userId: string): Promise<favoritePostEntity[] | null> {
        return await FavoritePost.findAll({
            where:{
                userId:userId
            },
            order:[['addedAt','DESC']]
        })
    }

    async addFavoritePost(userId: string, postId: string): Promise<favoritePostEntity | null> {
        return await FavoritePost.create({
            userId:userId,
            postId:postId

        })
    }
    async deleteFavoritePost(favoritePostId:string): Promise<number | null> {
        return await FavoritePost.destroy({
            where:{
                id:favoritePostId
            }
        })
    }

}