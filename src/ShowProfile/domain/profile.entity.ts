import { followStatsEntity } from "src/Follow/domain/follow.stats.entity"
import { postEntity } from "src/Post/domain/post.entity"
import { UserEntity } from "src/user/domian/user.entity"

export interface profileEntity{
    id:string
    user:UserEntity
    followStats:followStatsEntity
    userRecomendacion:UserEntity[]
    posts: postEntity[]
    
}