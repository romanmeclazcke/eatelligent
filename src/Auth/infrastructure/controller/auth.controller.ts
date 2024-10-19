import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { authUseCases } from 'src/Auth/application/auth.use.cases';
import { changePasswordDto } from 'src/Auth/domain/dto/change.password.dto';
import { loginDto } from 'src/Auth/domain/dto/login.dto';
import { resetPasswordDto } from 'src/Auth/domain/dto/reset.password.dto';
import { Public } from 'src/Shared/infrastructure/decorators/is.public';

@ApiTags('auth')
@Controller('auth')
export class authController {
  constructor(private authUseCases: authUseCases) { }

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'login using email and password' })
  @ApiResponse({ status: 200, description: 'JWT'})
  @ApiResponse({ status: 400, description: 'Invalid password'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 500, description: 'Token is required to verify account'})
  @ApiResponse({ status: 500, description: 'you need confirm you email, we send a emails, check!'})
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
  @ApiOperation({ summary: 'Validate email using a token' })
  @ApiQuery({ name: 'token', description: 'Token used to validate the email', required: true, type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @ApiResponse({ status: 200, description: 'Email validated successfully'})
  @ApiResponse({ status: 400, description: 'Invalid token'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 500, description: 'Token is required to verify account'})
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
  @ApiOperation({ summary: 'Change password of account' })
  @ApiResponse({ status: 200, description: 'User updated'})
  @ApiResponse({ status: 400, description: 'Invalid password'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 404, description: 'new passwords most be the same'})
  @ApiResponse({ status: 500, description: 'Internal server error'})
  async changePassword(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() changePasswordDto: changePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authUseCases.changePassword(userId, changePasswordDto);
    result.isSucces
      ? res
        .status(result.statusCode)
        .json({ message: result.value, details: true })
      : res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
  }

  @Public()
  @ApiOperation({ summary: 'This will send a email to yor email account to reset password' })
  @ApiResponse({ status: 200, description: 'Email sended'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @Get('send-email/reset-password/:userId')
  async sendEmailResetPassword(
    @Param('userId') userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authUseCases.sendEmailResetPassword(userId);
    result.isSucces
      ? res
        .status(result.statusCode)
        .json({ message: result.value, details: true })
      : res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
  }

  @Public()
  @Patch('reset-password')
  @ApiOperation({ summary: 'Reset password of user' })
  @ApiQuery({ name: 'token', description: 'Token used to reset password', required: true, type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @ApiResponse({ status: 200, description: 'Password reset successfully'})
  @ApiResponse({ status: 400, description: 'Invalid token'})
  @ApiResponse({ status: 404, description: 'User not found'})
  @ApiResponse({ status: 500, description: 'Token is required to reset password'})
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: resetPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authUseCases.resetPassword(token, resetPasswordDto);
    result.isSucces
      ? res
        .status(result.statusCode)
        .json({ message: result.value, details: true })
      : res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
  }
}
