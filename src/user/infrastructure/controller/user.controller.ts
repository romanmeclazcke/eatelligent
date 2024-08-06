import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, Res} from '@nestjs/common';
import { Request,Response } from 'express';
import { userUseCases } from 'src/user/application/user.use.cases';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';




@Controller('user')
export class userController {
    constructor(private userUseCase:userUseCases){}

    @Get()
    async getUsers(@Req() request:Request,@Res() response:Response) {
         const result = await  this.userUseCase.getAllUser();
         if(result.isSucces){
            response.status(200).json({message:result.value})
         }else{
            response.status(404).json({message:result.error})
         }
    }

    @Get(':id')
    async getUserById(@Param('id',  ParseUUIDPipe) id:string, @Req() request:Request, @Res() response:Response){
      const result = await this.userUseCase.getUserById(id);
      if(result.isSucces){
         response.status(result.statusCode).json({message:result.value,details:true})
      }else{
         response.status(result.statusCode).json({message:result.error,details:true})
      }
    }

    @Post("/new")
    async createUser(@Body() createUserDto: CreateUserDto,@Req() request:Request,@Res() response:Response){
      const result = await this.userUseCase.createUser(createUserDto);
      if(result.isSucces){
         response.status(result.statusCode).json({message:result.value,details:true})
      }else{
         response.status(result.statusCode).json({message:result.error,details:true})
      }
    }

   }  
