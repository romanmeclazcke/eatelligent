import { Injectable, Res } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { Result } from "../patternResult/result";

@Injectable()
export class AuthService{
    private readonly saltRounds=10;

    async hashPassword(password:string):Promise<Result<string>>{
        const passwordHashed = await bcrypt.hash(password,this.saltRounds);
        if(passwordHashed){
            return Result.succes(passwordHashed,200);
        }
        return Result.succes("Error to hash password",500);
    }

    async comparePassword(password:string, passwordHashed:string):Promise<Result<Boolean>>{
        const passwordCompare = await bcrypt.compare(password, passwordHashed);

        if(passwordCompare){
            return Result.succes(true,200);
        }
        return Result.failure("password most be the same", 400)
    }


}