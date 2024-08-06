import { Type } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";
export class CreateUserDto{

    @IsString()
    readonly  name: string;

    @IsString()
    readonly  lastName: string;

    @IsEmail() //puedo agregare propiedades para dar una respuesta especifica
    readonly  email: string;

    @IsString()
    readonly  password: string;

    @IsDate()
    @Type(() => Date) //transforma la informacion a un date
    readonly  birthdate: Date;

    @IsString()
    readonly  userName: string;

    
    @IsOptional()
    readonly  biography?: string;

    @IsOptional()
    readonly  profilePicture?: string;

}