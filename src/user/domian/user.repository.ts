import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/user.update";
import { UserEntity } from "./user.entity";

export interface userRepository{
    
    getUsers():Promise<UserEntity[]|null>
    getUserById(id:string):Promise<UserEntity|null>
    createUser(user:CreateUserDto):Promise<UserEntity|null>
    getUserByEmail(email: string):Promise<UserEntity|null>
    getUserByUserName(userName:string):Promise<UserEntity|null>
    updateUserInformation(user:UpdateUserDto,id:string):Promise<UserEntity|null>
    updateProfilePicture(file:string,id:string):Promise<UserEntity|null>
}