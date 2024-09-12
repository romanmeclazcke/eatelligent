import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { tokenInterface } from 'src/Auth/domain/token.interface';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';

@Injectable()
export class AuthGuardJwt implements CanActivate {
  constructor(private jwtService: JwtService, private userRepository: userRepositorySequelize) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      console.log('No token found');
      throw new UnauthorizedException('No token found');
    }
    console.log('Token:', token);
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const { id } = payload;

      const user = await this.userRepository.getUserById(id); //obtengo el estado de la cuenta del user

      if (!user.validateEmail) { //si no valido el email respondo con Unauthorized aunque nunca va a pasar, dado que para acceeder a un token debes validar tu email
        console.log('Email not validated');
        throw new UnauthorizedException('Email not validated');
      }

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
