import { IsString, MinLength } from "class-validator"

export class changePasswordDto{

    @MinLength(6)
    @IsString()
    oldPassword:string

    @MinLength(6)
    @IsString()
    newPassword:string

    @MinLength(6)
    @IsString()
    confirmPassword:string
}