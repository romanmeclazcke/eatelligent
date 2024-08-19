import { IsOptional, IsString } from "class-validator";

export class productCreateDto{    
    @IsString()
    readonly  name: string;

    @IsString()
    @IsOptional()
    readonly  productImage?: string;

}