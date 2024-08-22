import { dislikeProductEntity } from "./dislike.product.entity";

export interface dislikeProductRepository{

    getDislikeProduct(userId:string):Promise<dislikeProductEntity[]>
    addDislikeProduct(userId:string, productId:String):Promise<dislikeProductEntity>
    deleteDislikeProduct(userId:string,productId:string):Promise<number>
}