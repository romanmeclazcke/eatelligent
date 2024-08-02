import { Injectable } from '@nestjs/common';
import { userEntity } from 'src/user/domian/user.entity';
import { userRepository } from 'src/user/domian/user.repository';
import User from '../models/user.models';

@Injectable()
export class userRepositorySequelize implements userRepository {

    async  getUsers(): Promise<userEntity[] | null> {
        const user =await User.findAll()
        return user
    }

    
}
