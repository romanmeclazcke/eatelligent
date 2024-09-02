import { Injectable } from "@nestjs/common";
import { followEntity } from "src/Follow/domain/follow.entity";
import { followRepository } from "src/Follow/domain/follow.repository";
import Follow from "../model/follow.model";
import { Model } from "sequelize";
import User from "src/user/infrastructure/models/user.models";

@Injectable()
export class followRepositorySequelize implements followRepository {
    
    
    
    async followUser(followerId: string, followedId: string): Promise<followEntity | null> {
        return await Follow.create({
            
            followerId:followerId,
            followedId:followedId
        })
    }
    
    async unFollowUser(followerId: string, followedId: string): Promise<number | null> {
        return Follow.destroy({
            where:{
                followerId:followerId,
                followedId:followedId
            }
        })
    }
    
    findIfFollow(followerId: string, followedId: string): Promise<followEntity | null> {
       
       return Follow.findOne({
        attributes:['followedAt'],
        where:{
            followerId:followerId,
            followedId:followedId
        }
       })
    }

    async getListOfFollowers(userId: string): Promise<followEntity[] | null> {
        return await Follow.findAll({
            where: {
                followedId: userId
            },
            include: [{
                model:User,
                as:'follower',
                attributes:['userName']
            }
            ]
        });
    }

    async getListOfFolloweds(userId:string): Promise<followEntity[] | null> {
        return await Follow.findAll({
            where: {
                followed: userId
            },
            include: [{
                model:User,
                as:'follower',
                attributes:['userName']
            }
            ]
        });
    }
    
}