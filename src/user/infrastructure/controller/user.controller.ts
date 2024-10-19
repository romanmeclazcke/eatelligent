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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from 'src/Shared/infrastructure/decorators/is.public';
import { userUseCases } from 'src/user/application/user.use.cases';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';
import User from '../models/user.models';


@ApiTags('user')
@Controller('user')
export class userController {
  constructor(private userUseCase: userUseCases) {}


  @Get()
  @ApiResponse({ status: 200, type: User})
  @ApiResponse({ status: 404, description: 'Users nout found'})
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
  @ApiResponse({ status: 200, type: User})
  @ApiResponse({ status: 404, description: 'User nout found'})
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
  @Public()
  @UseInterceptors(FileInterceptor('profilePicture')) // 'profilePicture' es el nombre del campo de archivo que recibo
  @ApiResponse({status:201, description:"User Was Created", type: User})
  @ApiResponse({ status: 404, description: 'User with email already exists'})
  @ApiResponse({ status: 404, description: 'User with username already exists'})
  @ApiResponse({ status: 400, description: 'Prohibited content' })
  @ApiResponse({ status: 500, description: 'Error to create user' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiResponse({ status: 200, description: 'user information updated successfully'})
  @ApiResponse({ status: 404, description: 'User nout found'})
  @ApiResponse({ status: 400, description: 'Prohibited content' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiResponse({ status: 200, description: 'Profile picture updated successfully'})
  @ApiResponse({ status: 404, description: 'User nout found'})
  @ApiResponse({ status: 400, description: 'Prohibited content' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
