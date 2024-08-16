import { Injectable, Res } from "@nestjs/common";
import { sessionRepositorySequelize } from "../infrastructure/repository/session.repository.sequelize";
import { UserEntity } from "src/user/domian/user.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { LoginDto } from "../domain/dto/login.dto";
import { AuthService } from "src/shared/infrastructure/auth/auth.service";

@Injectable()
export class sessionUseCases{
    constructor(private readonly sessionRepository:sessionRepositorySequelize,private authService: AuthService,) {}


    async login(loginDto:LoginDto):Promise<Result<UserEntity|null>>{
        const user= await this.sessionRepository.login(loginDto);

        if(!user){ //para otri dia si user.validation = false no dejar 
            return Result.failure("User not found",404);
        }

        const comparePassword = await this.authService.comparePassword(loginDto.password, user.password);

        if(!comparePassword.isSucces){
            return Result.failure("Password is incorrect",401);
        }
        return Result.succes(user,200);
    }
    
}