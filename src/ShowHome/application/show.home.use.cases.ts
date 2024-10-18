import { postRepositorySequelize } from "src/Post/infrastructure/repository/post.repository.sequelize";
import { Result } from "src/Shared/infrastructure/patternResult/result";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";
import { showHomeEntity } from "../domain/show.home.entity";
import { postEntity } from "src/Post/domain/post.entity";

export class showHomeUseCases{
    constructor(private userRepository:userRepositorySequelize, private postRepository:postRepositorySequelize){}

    async showHome(userId:string):Promise<Result<showHomeEntity>>{
        const user = await this.userRepository.getUserById(userId);

        if(!user) return Result.failure("User not found", 404);

       const [postOfPeopleUserFollow,relevantPost] = await Promise.all([
            this.postRepository.getPostsFromUsersIFollow(userId),
            this.postRepository.getRelevanPost(userId)
       ])

       if(!postOfPeopleUserFollow&&!relevantPost) return Result.failure("Internal server error",500);

       const postsToShow = this.mixPost(postOfPeopleUserFollow,relevantPost);
       
       if(!postsToShow)return Result.failure("Internal server error",500);

       const showHome:showHomeEntity= {
            post:postsToShow
       }

       if(showHome) return Result.succes(showHome,200);

       return Result.failure("Internal server error",500);
    }

    mixPost(postOfPeopleUserFollow:postEntity[],relevantPost:postEntity[]):  postEntity[]{
        return  [...postOfPeopleUserFollow,...relevantPost]; //TODO : mix post => Example ,follow, follow, follow, relevant,follow, follow,follow, relevant...
    }
}