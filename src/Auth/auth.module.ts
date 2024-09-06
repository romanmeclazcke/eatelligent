import { Module } from '@nestjs/common';
import { authController } from './infrastructure/controller/auth.controller';
import { authRepositorySequelize } from './infrastructure/repository/auth.repository.sequelize';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    authController,
    JwtModule.register({
        global: true,
        secret: 'secret',
        signOptions: { expiresIn: '60s' },
      }),    
  ],
  providers: [
    authRepositorySequelize,
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}