import { UserEntity } from "src/user/domian/user.entity";
import { loginDto } from "./dto/login.dto";

export interface authRepository{
    validateUser(loginDto:loginDto):Promise<UserEntity|null>;
    validateAccount(email:string):Promise<number|null>;
}