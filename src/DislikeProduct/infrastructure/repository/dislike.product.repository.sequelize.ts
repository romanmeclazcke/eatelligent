import { Injectable } from "@nestjs/common";
import { dislikeProductEntity } from "src/DislikeProduct/domain/dislike.product.entity";
import { dislikeProductRepository } from "src/DislikeProduct/domain/dislike.product.repository";
import DislikeProduct from "../model/dislike.product.model";

@Injectable()
export class dislikeProductRepositorySequelize implements dislikeProductRepository{
    
    async getDislikeProduct(userId: string): Promise<dislikeProductEntity[]> {
        return await DislikeProduct.findAll({
            where:{userId:userId}
        })
    }

    async findDislikedProduct(userId: string, productId: string): Promise<dislikeProductEntity | null> {
        return await DislikeProduct.findOne({
            where:{
                userId:userId,  
                productId:productId
            }
        })
    }
    
    async addDislikeProduct(userId: string, productId: String): Promise<dislikeProductEntity> {
       return await DislikeProduct.create({
        userId:userId,
        productId:productId
       })
    }
    
    async deleteDislikeProduct(userId:string,productId:string): Promise<number> {
        return await DislikeProduct.destroy({where:{
            userId:userId,
            productId:productId
        }})
    }
}