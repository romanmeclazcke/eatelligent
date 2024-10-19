import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class changePasswordDto{

    @ApiProperty({
        description: 'old password of user',
        example: 'pepe123',
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    oldPassword:string

    @ApiProperty({
        description: 'New password of user',
        example: '1234567',
        uniqueItems:true,
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    newPassword:string


    @ApiProperty({
        description: 'Confirm password, most be the same that new password',
        example: '1234567',
        uniqueItems:true,
        nullable:false,
    })
    @MinLength(6)
    @IsString()
    confirmPassword:string
}