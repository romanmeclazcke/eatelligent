import { userEntity } from "./user.entity";

export interface userRepository{
    
    getUsers():Promise<userEntity[]|null>
}