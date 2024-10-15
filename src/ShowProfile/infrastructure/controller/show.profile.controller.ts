import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { showProfileUseCases } from 'src/ShowProfile/application/show.profile.use.cases';

@Controller('show-profile')
export class showProfileController {
  constructor(private showProfileUseCases: showProfileUseCases) {}

  @Get('/user/:userId/:actualUserId')
  async showProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('actualUserId', ParseUUIDPipe) actualUserId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.showProfileUseCases.showProfile(userId,actualUserId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
