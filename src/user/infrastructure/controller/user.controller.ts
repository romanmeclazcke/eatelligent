import { Controller} from '@nestjs/common';
import { userUseCases } from 'src/user/application/user.use.cases';



@Controller('user')
export class userController {
    constructor(private userUseCase:userUseCases){}
    
}  
