import { postRepositorySequelize } from "src/Post/infrastructure/repository/post.repository.sequelize";
import { userRepositorySequelize } from "src/user/infrastructure/repository/user.repository.sequelize";

export class showHomeUseCases{
    constructor(private userRepository:userRepositorySequelize, private postRepository:postRepositorySequelize){}
}