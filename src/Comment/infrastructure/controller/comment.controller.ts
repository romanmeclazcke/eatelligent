import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Req, Res } from "@nestjs/common";
import { commentUseCases } from "src/Comment/application/comment.use.cases";
import { commentCreateDto } from "src/Comment/domain/dto/comment.create.dto";
import { Request, Response } from "express";
import { commentUpdateDto } from "src/Comment/domain/dto/comment.update.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags('comment')
@Controller('comment')
export class commentController {

    constructor(private commentUseCases: commentUseCases) {}

    @Post('/new/:userId/post/:postId')
    @ApiOperation({ summary: 'Create a new comment for a post' })
    @ApiParam({ name: 'userId', description: 'UUID of the user creating the comment' })
    @ApiParam({ name: 'postId', description: 'UUID of the post where the comment is being added' })
    @ApiBody({ type: commentCreateDto })
    @ApiResponse({ status: 201, description: 'Comment successfully created' })
    @ApiResponse({ status: 400, description: 'Comment contains bad words' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async createPost(
      @Body() commentCreateDto: commentCreateDto,
      @Param('userId', ParseUUIDPipe) userId: string,
      @Param('postId', ParseUUIDPipe) postId: string,
      @Req() request: Request,
      @Res() res: Response,
    ) {
      const result = await this.commentUseCases.addComment(userId, postId, commentCreateDto);
      result.isSucces?
        res.status(result.statusCode).json({ message: result.value, details: true }):
        res.status(result.statusCode).json({ message: result.error, details: false });
    }

    @Patch('/edit/:userId/comment/:commentId')
    @ApiOperation({ summary: 'Update an existing comment' })
    @ApiParam({ name: 'userId', description: 'UUID of the user editing the comment' })
    @ApiParam({ name: 'commentId', description: 'UUID of the comment to be updated' })
    @ApiBody({ type: commentUpdateDto })
    @ApiResponse({ status: 200, description: 'Comment successfully updated' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateComment(
      @Body() commentUpdateDto: commentUpdateDto,
      @Param('userId', ParseUUIDPipe) userId: string,
      @Param('commentId', ParseUUIDPipe) commentId: string,
      @Req() request: Request,
      @Res() res: Response,
    ) {
      const result = await this.commentUseCases.updateComment(userId, commentId, commentUpdateDto);
      result.isSucces?
        res.status(result.statusCode).json({ message: result.value, details: true }):
        res.status(result.statusCode).json({ message: result.error, details: false });
    }

    @Delete('/delete/:userId/comment/:commentId')
    @ApiOperation({ summary: 'Delete a comment' })
    @ApiParam({ name: 'userId', description: 'UUID of the user deleting the comment' })
    @ApiParam({ name: 'commentId', description: 'UUID of the comment to be deleted' })
    @ApiResponse({ status: 200, description: 'Comment successfully deleted' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteComment(
      @Param('userId', ParseUUIDPipe) userId: string,
      @Param('commentId', ParseUUIDPipe) commentId: string,
      @Req() request: Request,
      @Res() res: Response,
    ) {
      const result = await this.commentUseCases.deleteComment(userId, commentId);
      result.isSucces?
        res.status(result.statusCode).json({ message: result.value, details: true }):
        res.status(result.statusCode).json({ message: result.error, details: false });
    }
}
