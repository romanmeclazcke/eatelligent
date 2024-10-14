import { IsString, MinLength } from "class-validator"

export class resetPasswordDto{
    @MinLength(6)
    @IsString()
    newPassword:string

    @MinLength(6)
    @IsString()
    confirmPassword:string
}