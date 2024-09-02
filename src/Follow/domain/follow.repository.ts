import { followEntity } from "./follow.entity";

export interface followRepository{

    followUser(followerId:string, followedId:string):Promise<followEntity|null>
    unFollowUser(followerId:string, followedId:string):Promise<number|null>
    findIfFollow(followerId:string, followedId:string):Promise<followEntity|null>
    getListOfFollowers(userId:string):Promise<followEntity[]|null>
    getListOfFolloweds(userId:string):Promise<followEntity[]|null>
}