import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDto{

    @ApiProperty({
        description: 'User name',
        example: 'John',
        uniqueItems:true,
        nullable:false,
    })
    @IsString()
    readonly  name: string;


    @ApiProperty({
        description: 'Last name',
        example: 'Doe',
        uniqueItems:false,
        nullable:false,
    })
    @IsString()
    readonly  lastName: string;


    @ApiProperty({
        description: 'User email',
        example: 'JohnDoe@gmail.com',
        uniqueItems:true,
        nullable:false,
    })
    @IsEmail() //puedo agregare propiedades para dar una respuesta especifica
    readonly  email: string;


    @ApiProperty({
        description: 'password',
        example: 'jhon123',
        uniqueItems:false,
        nullable:false,
    })
    @IsString()
    readonly  password: string;


    @ApiProperty({
        description: 'birthdate',
        example: '10-10-2004',
        uniqueItems:false,
        nullable:false,
    })
    @IsDate()
    @Type(() => Date) //transforma la informacion a un date
    readonly  birthdate: Date;


    @ApiProperty({
        description: 'User name',
        example: 'jhon_do',
        uniqueItems:true,
        nullable:false,
        minLength:6
    })
    @IsString()
    @MinLength(6, { message: 'userName debe tener al menos 6 caracteres' })
    readonly  userName: string;

    @ApiProperty({
        description: 'biography of user',
        example: 'i love drink mate and listen music',
        uniqueItems:false,
        nullable:true,
    })
    @IsOptional()
    readonly  biography?: string;


    @ApiProperty({
        description: 'Profile pciture',
        uniqueItems:false,
        nullable:true,
    })
    @IsOptional()
    readonly  profilePicture?: string;
}