import { IsBoolean, IsOptional, IsString } from "class-validator";

export class commentUpdateDto{
 
    
    @IsString()
    @IsOptional()
    readonly  comment: string;
    
    @IsBoolean()
    @IsOptional()
    readonly status?:boolean
}