import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class loginDto{

    @ApiProperty({
        description: 'email of user',
        example: 'pepe@gmail.com',
        nullable:false,
    })
    @IsEmail()
    email: string;

    
    @ApiProperty({
        description: 'password of user',
        example: 'pepe123',
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    password:string
}