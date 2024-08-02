import { Injectable } from "@nestjs/common";
import { userRepositoryPrisma } from "../infrastructure/repository/user.repository.prisma";
import { Result } from "src/shared/result/result";
import { userEntity } from "../domian/user.entity";

@Injectable()
export class userUseCases {
    
    constructor(private userRepository: userRepositoryPrisma){}

    async getAllUser(): Promise<Result<userEntity[]>>{
       const user = await this.userRepository.getUsers();
        if(user){
            return Result.succes(user,200)
        }else{
            return  Result.failure("user not found",404)
        }
    }
}