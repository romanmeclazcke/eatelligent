import { followEntity } from "./follow.entity";
import { followStatsEntity } from "./follow.stats.entity";

export interface followRepository{

    followUser(followerId:string, followedId:string):Promise<followEntity|null>
    unFollowUser(followerId:string, followedId:string):Promise<number|null>
    findIfFollow(followerId:string, followedId:string):Promise<followEntity|null>
    getListOfFollowers(userId:string):Promise<followEntity[]|null>
    getListOfFolloweds(userId:string):Promise<followEntity[]|null>
    getFollowStats(userId:string):Promise<followStatsEntity|null>;
}