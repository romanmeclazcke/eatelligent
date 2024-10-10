import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { authUseCases } from 'src/Auth/application/auth.use.cases';
import { changePasswordDto } from 'src/Auth/domain/dto/change.password.dto';
import { loginDto } from 'src/Auth/domain/dto/login.dto';
import { Public } from 'src/Shared/infrastructure/decorators/is.public';

@Controller('auth')
export class authController {
  constructor(private authUseCases: authUseCases) {}

  @Post('/login')
  @Public()
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
    const result = await this.authUseCases.validateAccount(token);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }


  @Patch('/change-password/:userId')
  async changePassword(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto:changePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authUseCases.changePassword(userId,changePasswordDto);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Get('/reset-password/:userId')
  async sendEmailResetPassword(
    @Query('userId') userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log("entre")
    const result = await this.authUseCases.sendEmailResetPassword(userId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
