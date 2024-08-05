import { Injectable } from "@nestjs/common";
import { userRepositorySequelize } from "../infrastructure/repository/user.repository.sequelize";
import { userEntity } from "../domian/user.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { userCreate } from "../domian/dto/user.create";
import { create } from "domain";

@Injectable()
export class userUseCases {
    
    constructor(private userRepository: userRepositorySequelize){}

    async getAllUser(): Promise<Result<userEntity[]|null>>{
       const user = await this.userRepository.getUsers();
        if(user){
            return Result.succes(user,200)
        }else{
            return  Result.failure("user not found",404)
        }
    }

    async getUserById(id:string):Promise<Result<userEntity|null>>{
        const user = await this.userRepository.getUserById(id);
        if(user){
            return Result.succes(user,200)
        }else{
            return Result.failure("user not found",404)
        }
    }

    async createUser(createUser:userCreate):Promise<Result<userEntity|null>>{
        const userCreated= await this.userRepository.getUserByEmail(createUser.email);
        console.log(userCreated)

        if(userCreated!){
            return Result.failure("User with email already exists",404);
        }
        const usernameInUse= await this.userRepository.getUserByUserName(createUser.userName);

        if(usernameInUse){
            return Result.failure("User with username already exists",404);
        }

    
        const user = await this.userRepository.createUser(createUser);
        if(user){
            return Result.succes(user,200)
        }else{
            return Result.failure("user not found",404)
        }   
    }
}