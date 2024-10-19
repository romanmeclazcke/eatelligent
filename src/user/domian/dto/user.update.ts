import { ApiProperty } from "@nestjs/swagger";
import {Type} from "class-transformer"
import { IsDate, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{

    @ApiProperty({
        description: 'User name',
        example: 'John',
        uniqueItems:true,
        nullable:true,
    })
    @IsString()
    @IsOptional()
    readonly  name: string;


    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        uniqueItems:false,
        nullable:true,
    })
    @IsString()
    @IsOptional()
    readonly  lastName: string;


    @ApiProperty({
        description: 'User email',
        example: 'JohnDoe@gmail.com',
        uniqueItems:true,
        nullable:true,
    })
    @IsEmail()
    @IsOptional() //puedo agregare propiedades para dar una respuesta especifica
    readonly  email: string;


    @ApiProperty({
        description: 'birthdate',
        example: '10-10-2004',
        uniqueItems:false,
        nullable:true,
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date) //transforma la informacion a un date
    readonly  birthdate: Date;


    @ApiProperty({
        description: 'User name',
        example: 'jhon_do',
        uniqueItems:true,
        nullable:true,
        minLength:6
    })
    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'userName debe tener al menos 6 caracteres' })
    readonly  userName: string;

    @ApiProperty({
        description: 'biography of user',
        example: 'i love drink mate and listen music',
        uniqueItems:false,
        nullable:true,
    })
    @IsOptional()
    @IsOptional()
    readonly  biography?: string;
}