import {Type} from "class-transformer"
import { IsDate, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsOptional()
    readonly  name: string;

    @IsString()
    @IsOptional()
    readonly  lastName: string;

    @IsEmail()
    @IsOptional() //puedo agregare propiedades para dar una respuesta especifica
    readonly  email: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date) //transforma la informacion a un date
    readonly  birthdate: Date;

    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'userName debe tener al menos 6 caracteres' })
    readonly  userName: string;

    
    @IsOptional()
    @IsOptional()
    readonly  biography?: string;
}