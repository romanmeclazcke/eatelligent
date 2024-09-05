import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { postUsesCases } from 'src/Post/application/post.use.cases';
import { postCreateDto } from 'src/Post/domain/dto/post.create.dto';
import { postUpdateDto } from 'src/Post/domain/dto/post.update.dto';

@Controller('post')
export class postController {
  constructor(private postUseCases: postUsesCases) {}

  @Get('all/follow/:userId')
  async getPostsFromUsersIFollow(
    @Param('userId', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.getPostsFromUsersIFollow(id);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Get(':id')
  async getPostByID(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.getPostById(id);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Get('all/user/:userId')
  async getPostByUser(
    @Param('userId', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.getPostByUser(id);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Post('/new/:userId')
  @UseInterceptors(FileInterceptor('postPicture'))
  async createPost(
    @Body() postCreateDto: postCreateDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.createPost(id, postCreateDto, file);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Patch('/edit/:userId/:postId')
  @UseInterceptors(FileInterceptor('postPicture'))
  async updatePost(
    @Body() postUpdateDto: postUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.editPost(
      userId,
      postId,
      postUpdateDto,
      file,
    );

    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
  @Delete('delete/:userId/:postId')
  async deletePost(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postUseCases.deletePost(userId, postId);

    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
