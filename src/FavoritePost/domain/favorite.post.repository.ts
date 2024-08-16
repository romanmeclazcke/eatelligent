import { favoritePostEntity } from "./favorite.post.entity";

export interface favoritePostRepository{
    
   getFavoritePost(userId:string):Promise<favoritePostEntity[]|null>;
   addFavoritePost(userId:string,postId:string):Promise<favoritePostEntity|null>;
   deleteFavoritePost(favoritePostId:string):Promise<number|null>;
}