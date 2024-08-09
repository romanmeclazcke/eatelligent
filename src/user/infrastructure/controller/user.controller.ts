import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { userUseCases } from 'src/user/application/user.use.cases';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';

@Controller('user')
export class userController {
  constructor(private userUseCase: userUseCases) {}

  @Get()
  async getUsers(@Req() request: Request, @Res() res: Response) {
    const result = await this.userUseCase.getAllUser();
    if (result.isSucces) {
      res.status(200).json({ message: result.value });
    } else {
      res.status(404).json({ message: result.error });
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const result = await this.userUseCase.getUserById(id);
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

  @Post('/new')
  @UseInterceptors(FileInterceptor('profilePicture')) // 'profilePicture' es el nombre del campo de archivo que recibo
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File, //recibo el archivo subido
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userUseCase.createUser(createUserDto, file);
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

  @Patch('/update/information/:id')
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userUseCase.updateUserInformation(updateUserDto,id);
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
