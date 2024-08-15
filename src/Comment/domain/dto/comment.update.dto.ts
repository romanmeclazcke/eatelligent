import { IsBoolean, IsOptional, IsString } from "class-validator";

export class commentUpdateDto{
 
    
    @IsString()
    @IsOptional()
    readonly  description?: string;
    
    @IsBoolean()
    @IsOptional()
    readonly status?:boolean
}