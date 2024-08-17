import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class mealUpdateDto{
    

    @IsString()
    @IsOptional()
    readonly  name?: string;

    @IsString()
    @IsOptional()
    readonly image?:string
    
    @IsString()
    @IsOptional()
    readonly recipe?:string
    
    @IsNumber()
    @IsOptional()
    readonly calories?:number
    
    @IsNumber()
    @IsOptional()
    readonly protein?:number
    
    
    @IsNumber()
    @IsOptional()
    readonly carbohydrates?:number

    @IsBoolean()
    @IsOptional()
    readonly glutenFree?:boolean
}