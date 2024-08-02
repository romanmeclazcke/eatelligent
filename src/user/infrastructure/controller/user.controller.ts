import { Controller, Get, Req, Res} from '@nestjs/common';
import { Request,Response } from 'express';
import { userUseCases } from 'src/user/application/user.use.cases';




@Controller('user')
export class userController {
    constructor(private userUseCase:userUseCases){}

    @Get()
    async getAll(@Req() request:Request,@Res() response:Response) {
         const result = await  this.userUseCase.getAllUser();
         if(result.isSucces){
            response.status(200).json({message:result.value})
         }else{
            response.status(404).json({message:result.error})
         }
    }
    
}  
