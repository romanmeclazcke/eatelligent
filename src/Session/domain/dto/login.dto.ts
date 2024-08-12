import { IsEmail, IsString, isString } from "class-validator";

export class LoginDto{
    @IsEmail() //puedo agregare propiedades para dar una respuesta especifica
    readonly  email: string;

    @IsString()
    readonly  password: string;
}