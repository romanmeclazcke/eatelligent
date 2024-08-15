import { IsOptional, IsString } from "class-validator";

export class commentCreateDto{
    
    @IsString()
    readonly  comment: string;

}