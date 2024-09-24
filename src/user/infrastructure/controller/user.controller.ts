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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthGuardJwt } from 'src/Shared/infrastructure/guards/auth.guard.jwt';
import { userUseCases } from 'src/user/application/user.use.cases';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';

@Controller('user')
export class userController {
  constructor(private userUseCase: userUseCases) {}


  @Get()
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const result = await this.userUseCase.getAllUser();
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userUseCase.getUserById(id);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
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
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Patch('/update/information/:id')
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userUseCase.updateUserInformation(
      updateUserDto,
      id,
    );
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Patch('/update/profile-picture/:id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async updateProfilePicture(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File, //recibo el archivo subido
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!file) {
      return res
        .status(404)
        .json({ message: 'new profile picture cant be null', details: true });
    }
    const result = await this.userUseCase.updateProfilePicture(file, id);

    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
