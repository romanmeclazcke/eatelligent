import { IsOptional, IsString } from "class-validator";

export class postUpdateDto{

    @IsString()
    @IsOptional()
    readonly  description?: string;

    @IsString()
    @IsOptional()
    readonly  profilePicture?: string;


}