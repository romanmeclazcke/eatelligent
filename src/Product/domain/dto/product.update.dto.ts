import { IsOptional, IsString } from "class-validator";

export class productUpdateDto {    
    @IsString()
    @IsOptional()
    readonly  name: string;

    @IsString()
    @IsOptional()
    readonly  productImage?: string;

}