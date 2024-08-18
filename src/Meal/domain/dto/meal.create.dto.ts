import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class mealCreateDto{
    
    @IsString()
    readonly  name: string;

    @IsString()
    @IsOptional()
    readonly image?:string
    
    @IsString()
    readonly recipe:string
    
    @IsNumber()
    readonly calories:number
    
    @IsNumber()
    readonly protein:number
    
    @IsNumber()
    readonly carbohydrates:number

    @IsBoolean()
    readonly glutenFree:boolean

}