import { Injectable, Res } from '@nestjs/common';
import { loginDto } from '../domain/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { AuthService } from 'src/Shared/infrastructure/auth/auth.service';
import { tokenInterface } from '../domain/token.interface';
import { authRepositorySequelize } from '../infrastructure/repository/auth.repository.sequelize';
import { sendEmailServices } from 'src/Shared/infrastructure/emailServices/send.email.service';
import {
  CONST_VERIFY_ACCOUNT_SUBJECT,
  CONST_VERIFY_ACCOUNT_TEXT,
} from 'src/Templates/auth/verify.account/verify.account.const';
import { VERIFY_ACCOUNT } from 'src/Templates/auth/verify.account/verify.account';
import { changePasswordDto } from '../domain/dto/change.password.dto';
import { UserEntity } from 'src/user/domian/user.entity';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';

@Injectable()
export class authUseCases {
  constructor(
    private jwtService: JwtService,
    private authRepository: authRepositorySequelize,
    private authService: AuthService,
    private userRepositorySequelize: userRepositorySequelize,
    private emailServices: sendEmailServices,
  ) {}

  async login(loginDto: loginDto): Promise<Result<{ access_token: string }>> {
    const user = await this.authRepository.validateUser(loginDto);

    if (!user) {
      return Result.failure('User not found', 404);
    }
    const isValidPassword = await this.authService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword.isSucces) {
      return Result.failure('Invalid password', 500);
    }

    if (!user.validateEmail) {
      const token = await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      this.emailServices.sendEmail(
        CONST_VERIFY_ACCOUNT_SUBJECT,
        VERIFY_ACCOUNT(user.userName, token),
        user.email,
        CONST_VERIFY_ACCOUNT_TEXT,
      );
      return Result.failure(
        'You need confirm you email, we send a emails, check!',
        503,
      );
    }

    const payload = { id: user.id, name: user.name, email: user.email };

    return Result.succes(
      { access_token: await this.jwtService.signAsync(payload) },
      200,
    );
  }

  async validateAccount(token: string): Promise<Result<boolean>> {
    if (!token)
      return Result.failure('Token is required to verify account', 500);

    const payload: tokenInterface = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });


    if (!payload.email)
      return Result.failure('Emails is necesary to verify account', 404);

    const user = await this.userRepositorySequelize.getUserByEmail(
      payload.email,
    );

    if (!user) return Result.failure('User not found', 404);

    if (user.validateEmail) {
      return Result.failure('Already validate', 404); //que error es?
    }

    const validated = await this.authRepository.validateAccount(user.id);

    if (!validated) return Result.failure('Error to validate account', 500);

    return Result.succes(true, 200);
  }

  async changePassword(userId:string, changePasswordDto:changePasswordDto):Promise<Result<UserEntity>>{
    const user =  await this.userRepositorySequelize.getUserById(userId);

    if(!user)return Result.failure("User not found",404)

    const isValidPassword = await this.authService.comparePassword(changePasswordDto.oldPassword,user.password);

    if(!isValidPassword) return Result.failure("Invalid password",500);

    if(changePasswordDto.newPassword!=changePasswordDto.confirmPassword) return Result.failure("new password most be the same",404)

    const newPasswordHashed= await this.authService.hashPassword(changePasswordDto.newPassword)

    if(!newPasswordHashed) return Result.failure("Internal server error",500);

    
    const userPasswordUpdated =await this.userRepositorySequelize.changePassword(userId,changePasswordDto);

    if(userPasswordUpdated)  return Result.succes(userPasswordUpdated,200);

    return Result.failure("Internal server error",500)

  }

  async sendEmailResetPassword(userId:string){
    const user = await this.userRepositorySequelize.getUserById(userId);

    if(!user)return Result.failure("User not found",404)

    
  }
}
