import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { likeUseCases } from 'src/Like/application/like.use.cases';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('like')
@Controller('like')
export class likeController {
  constructor(private likeUseCases: likeUseCases) {}

  @Post('/give-like/:userId/:postId')
  async giveLike(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.likeUseCases.giveLike(userId, postId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Delete('/dislike-post/:userId/:postId')
  async dislikePost(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.likeUseCases.dislikePost(userId, postId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
