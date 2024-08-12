import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { sessionUseCases } from 'src/Session/application/session.use.cases';
import { LoginDto } from 'src/Session/domain/dto/login.dto';

@Controller('session')
export class sessionController {
  constructor(private sessionUseCases: sessionUseCases) {}

  @Post('/login')
  async createUser(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.sessionUseCases.login(loginDto);
    if (result.isSucces) {
      res
        .status(result.statusCode)
        .json({ message: result.value, details: true });
    } else {
      res
        .status(result.statusCode)
        .json({ message: result.error, details: true });
    }
  }
}
