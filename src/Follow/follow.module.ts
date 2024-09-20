import { Module } from '@nestjs/common';

import { followController } from './infrastructure/controller/follow.controller';
import { followUseCases } from './application/follow.use.cases';
import { followRepositorySequelize } from './infrastructure/repository/follow.repository.sequelize';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';


@Module({
  controllers: [followController],
  providers:[followUseCases,followRepositorySequelize,userRepositorySequelize],
  exports:[followRepositorySequelize],
  imports:[]
})
export class FollowModule {}
