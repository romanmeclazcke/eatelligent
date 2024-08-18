import { likeEntity } from "./like.entity";

export interface likeRepository{
    likePost(userId:string,postId:string):Promise<likeEntity>
    dislikePost(userId:string,postId:string):Promise<number>
    findLike(userId:string, postId:string):Promise<likeEntity|null>
}