import { Controller, Delete, Param, ParseUUIDPipe, Post, Req, Res } from "@nestjs/common";
import { likeUseCases } from "src/Like/application/like.use.cases";
import {Request,Response} from "express"

@Controller('like')
export class likeController{

    constructor(private likeUseCases: likeUseCases){}

    @Post('/give-like/:userId/:postId')
    async giveLike(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Param('postId', ParseUUIDPipe) postId: string,
        @Req() request: Request,
        @Res() res: Response,
      ) {
        const result = await this.likeUseCases.giveLike(userId,postId);
        if (result.isSucces) {
          res.status(result.statusCode).json({ message: result.value, details: true });
        } else {
          res.status(result.statusCode).json({ message: result.error, details: false });
        }
      }


    

    @Delete('/dislike-post/:userId/:postId')
    async dislikePost(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Param('postId', ParseUUIDPipe) postId: string,
        @Req() request: Request,
        @Res() res: Response,
      ) {
        const result = await this.likeUseCases.dislikePost(userId,postId);
        if (result.isSucces) {
          res.status(result.statusCode).json({ message: result.value, details: true });
        } else {
          res.status(result.statusCode).json({ message: result.error, details: false });
        }
      }
}