import { IsOptional, IsString } from "class-validator";

export class postCreateDto{
    
    @IsString()
    @IsOptional()
    readonly  description?: string;

    @IsString()
    @IsOptional()
    readonly  image?: string;

}