import { Injectable } from '@nestjs/common';
import { loginDto } from '../domain/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { Result } from 'src/shared/infrastructure/patternResult/result';
import { AuthService } from 'src/shared/infrastructure/auth/auth.service';
import { tokenInterface } from '../domain/token.interface';
import { authRepositorySequelize } from '../infrastructure/repository/auth.repository.sequelize';

@Injectable()
export class authUseCases {
  constructor(
    private jwtService: JwtService,
    private authRepository: authRepositorySequelize,
    private authService: AuthService,
    private userRepositorySequelize: userRepositorySequelize,
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
    const payload = { id: user.id,name:user.name, email: user.email };

    return Result.succes(
      { access_token: await this.jwtService.signAsync(payload) },
      200,
    );
  }

  async validateAccount(token: string): Promise<Result<boolean>> {
    if (!token)
      return Result.failure('Token is required to verify account', 500);

    console.log(token);

    const payload: tokenInterface = await this.jwtService.decode(token);

    console.log(payload);

    if (!payload.email)
      return Result.failure('Emails is necesary to verify account', 404);

    const user = await this.userRepositorySequelize.getUserByEmail(
      payload.email,
    );

    console.log(user);

    if (!user) return Result.failure("User not found",404);

    const validated= await this.authRepository.validateAccount(user.id);
    console.log(validated);
    
    if(!validated) return Result.failure("Error to validate account",500);

    return Result.succes(true,200);
 
  }
}
