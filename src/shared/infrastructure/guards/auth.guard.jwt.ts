import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';

@Injectable()
export class AuthGuardJwt implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: userRepositorySequelize,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic',context.getHandler());//si e
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('No token found');
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const { id } = payload;

      const user = await this.userRepository.getUserById(id); //obtengo el estado de la cuenta del user

      //si no valido el email respondo con Unauthorized aunque nunca va a pasar, dado que para acceeder a un token debes validar tu email
      if (!user.validateEmail)
        throw new UnauthorizedException('Email not validated');

    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Extract the token part
    }
    return undefined;
  }
}
