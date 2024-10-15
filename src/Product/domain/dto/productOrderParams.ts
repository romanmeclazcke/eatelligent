import { IsIn, IsOptional, IsString, Validate, validate } from "class-validator";
import { productEntity } from "../product.entity";
import { IsValidFieldProduct } from "../validator/product.is.valid.field";


export class productOrderParams {
    @IsOptional()
    @IsString()
    @Validate(IsValidFieldProduct)
    sort?: keyof productEntity; //only allow product attribute


    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}