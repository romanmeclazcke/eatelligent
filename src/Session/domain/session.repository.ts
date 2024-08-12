import { LoginDto } from "./dto/login.dto";
import { UserEntity } from "src/user/domian/user.entity";

export interface sessionRepository{

    login(userLoginDto:LoginDto):Promise<UserEntity|null>;
}