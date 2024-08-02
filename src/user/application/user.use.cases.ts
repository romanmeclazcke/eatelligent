import { Injectable } from "@nestjs/common";
import { userRepositorySequelize } from "../infrastructure/repository/user.repository.sequelize";
import { userEntity } from "../domian/user.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";

@Injectable()
export class userUseCases {
    
    constructor(private userRepository: userRepositorySequelize){}

    async getAllUser(): Promise<Result<userEntity[]>>{
       const user = await this.userRepository.getUsers();
        if(user){
            return Result.succes(user,200)
        }else{
            return  Result.failure("user not found",404)
        }
    }
}