import { userCreate } from "./dto/user.create";
import { userEntity } from "./user.entity";

export interface userRepository{
    
    getUsers():Promise<userEntity[]|null>
    getUserById(id:string):Promise<userEntity|null>
    createUser(user:userCreate):Promise<userEntity|null>
    getUserByEmail(email: string):Promise<userEntity|null>
    getUserByUserName(userName:string):Promise<userEntity|null>
}