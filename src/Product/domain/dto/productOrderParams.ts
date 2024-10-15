import { IsIn, IsOptional, IsString, Validate, validate } from "class-validator";
IsValidFieldProduct
import { productEntity } from "../product.entity";
import { IsValidFieldProduct } from "./validator/product.is.valid.field";


export class productOrderParams {
    @IsOptional()
    @IsString()
    @Validate(IsValidFieldMeals)
    sort?: keyof productEntity; 


    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}