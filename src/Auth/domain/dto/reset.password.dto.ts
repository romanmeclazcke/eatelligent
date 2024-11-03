import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class resetPasswordDto{

    @ApiProperty({
        description: 'New password of user account.',
        example: 'pepe123',
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    newPassword:string


    @ApiProperty({
        description: 'Confirm new password of user accout, most be the same that new password.',
        example: 'pepe123',
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    confirmPassword:string
}