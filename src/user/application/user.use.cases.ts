import { Injectable } from "@nestjs/common";
import { userRepositorySequelize } from "../infrastructure/repository/user.repository.sequelize";
import { UserEntity } from "../domian/user.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { CreateUserDto } from "../domian/dto/create.user.dto";


@Injectable()
export class userUseCases {
    
    constructor(private userRepository: userRepositorySequelize){}

    async getAllUser(): Promise<Result<UserEntity[]|null>>{
       const user = await this.userRepository.getUsers();
        if(user){
            return Result.succes(user,200)
        }else{
            return  Result.failure("user not found",404)
        }
    }

    async getUserById(id:string):Promise<Result<UserEntity|null>>{
        const user = await this.userRepository.getUserById(id);
        if(user){
            return Result.succes(user,200)
        }else{
            return Result.failure("user not found",404)
        }
    }

    async createUser(createUser:CreateUserDto):Promise<Result<UserEntity|null>>{
        const emailInUse= await this.userRepository.getUserByEmail(createUser.email);
        
        if(emailInUse){
            return Result.failure("User with email already exists",404);
        }
        const usernameInUse= await this.userRepository.getUserByUserName(createUser.userName);

        if(usernameInUse){
            return Result.failure("User with username already exists",404);
        }

        const user = await this.userRepository.createUser(createUser);
        if(user){
            return Result.succes(user,201)
        }else{
            return Result.failure("user not found",404)
        }   
    }
}