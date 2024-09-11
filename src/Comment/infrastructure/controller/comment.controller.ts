import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Req, Res } from "@nestjs/common";
import { commentUseCases } from "src/Comment/application/comment.use.cases";
import { commentCreateDto } from "src/Comment/domain/dto/comment.create.dto";
import { Request, Response } from "express";
import path from "path";
import { commentUpdateDto } from "src/Comment/domain/dto/comment.update.dto";

@Controller('comment')
export class commentController{

    constructor(private commentUseCases:commentUseCases){}


    @Post('/new/:userId/post/:postId')
    async createPost(
    @Body() commentCreateDto: commentCreateDto,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.commentUseCases.addComment(userId,postId,commentCreateDto);
    result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });

  }

  @Patch('/edit/:userId/comment/:commentId')
    async updateComment(
    @Body() commentUpdateDto: commentUpdateDto,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.commentUseCases.updateComment(userId,commentId,commentUpdateDto);
    result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });
  }


  @Delete('/delete/:userId/comment/:idComment')
  async deleteComment(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.commentUseCases.deleteComment(userId,commentId);
    result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
    
}