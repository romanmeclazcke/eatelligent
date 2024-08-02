import { Injectable } from '@nestjs/common';
import { userRepository } from 'src/user/domian/user.repository';

@Injectable()
export class userRepositoryPrisma implements userRepository {

}
