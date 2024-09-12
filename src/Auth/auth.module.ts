import { Module } from '@nestjs/common';
import { authController } from './infrastructure/controller/auth.controller';
import { authRepositorySequelize } from './infrastructure/repository/auth.repository.sequelize';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { authUseCases } from './application/auth.use.cases';
import { sendEmailServices } from 'src/shared/infrastructure/emailServices/send.email.service';


@Module({
  imports: [
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),    
  ],
  controllers:[authController],
  providers: [
    authRepositorySequelize,
    AuthService,
    userRepositorySequelize,
    authUseCases,
    sendEmailServices,
  ],
  exports: [],
})
export class AuthModule {}