import { CreateUserDto } from "./dto/create.user.dto";
import { UserEntity } from "./user.entity";

export interface userRepository{
    
    getUsers():Promise<UserEntity[]|null>
    getUserById(id:string):Promise<UserEntity|null>
    createUser(user:CreateUserDto):Promise<UserEntity|null>
    getUserByEmail(email: string):Promise<UserEntity|null>
    getUserByUserName(userName:string):Promise<UserEntity|null>
}