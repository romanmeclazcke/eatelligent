import { Body, Controller, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { authUseCases } from 'src/Auth/application/auth.use.cases';
import { loginDto } from 'src/Auth/domain/dto/login.dto';

@Controller('auth')
export class authController {
  constructor(private authUseCases: authUseCases) {}

  @Post('/login')
  async login(
    @Body() loginDto: loginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authUseCases.login(loginDto);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Post('/validate-email')
  async validateEmail(
    @Query('token') token: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log("entre")
    const result = await this.authUseCases.validateAccount(token);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
