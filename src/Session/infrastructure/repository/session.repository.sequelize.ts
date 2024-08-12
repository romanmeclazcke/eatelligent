import { LoginDto } from "src/Session/domain/dto/login.dto";
import { sessionRepository } from "src/Session/domain/session.repository";
import { UserEntity } from "src/user/domian/user.entity";
import User from "src/user/infrastructure/models/user.models";

export class sessionRepositorySequelize implements sessionRepository{
    
    
    async login(userLoginDto: LoginDto): Promise<UserEntity | null> {
         return await User.findOne({
            attributes: ['id','name','password'],
            where:{email:userLoginDto.email},
            
        })
    }

}