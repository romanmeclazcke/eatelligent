import { Injectable } from "@nestjs/common";
import { userEntity } from "../domian/user.entity";
import { userRepositoryPrisma } from "../infrastructure/repository/user.repository.prisma";

@Injectable()
export class userUseCases {

    constructor(private userRepository: userRepositoryPrisma){}
}