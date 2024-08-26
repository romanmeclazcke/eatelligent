import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class mealCreateDto{
    
    @IsString()
    readonly  name: string;

    @IsString()
    @IsOptional()
    readonly mealPicture?:string
    
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


    @IsArray()
    @IsUUID('4', { each: true })
    readonly productsId: string[]

}