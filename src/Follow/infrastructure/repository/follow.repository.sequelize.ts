import { Injectable } from "@nestjs/common";
import { followEntity } from "src/Follow/domain/follow.entity";
import { followRepository } from "src/Follow/domain/follow.repository";
import Follow from "../model/follow.model";
import { Model } from "sequelize";
import User from "src/user/infrastructure/models/user.models";
import { followStatsEntity } from "src/Follow/domain/follow.stats.entity";

@Injectable()
export class followRepositorySequelize implements followRepository {
    
    async followUser(followerId: string, followedId: string): Promise<followEntity | null> {
        return await Follow.create({
            
            followerId:followerId,
            followedId:followedId
        }) //show what happend here that sometimes return a error
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
                attributes:['userName','profilePicture']
            }]
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
                attributes:['userName','profilePicture'] //changed it to know a profile picture

            }]
        });
    }


    async getFollowStats(userId: string): Promise<followStatsEntity | null> {
        // Ejecuto ambas consultas en paralelo lo que mejora la eficiencia
        const [followersCount, followingCount] = await Promise.all([
            Follow.count({
                where: {
                    followedId: userId
                }
            }),
            Follow.count({
                where: {
                    followerId: userId
                }
            })
        ]);
    
        return { userId, followersCount, followingCount };
    }
    
    
}