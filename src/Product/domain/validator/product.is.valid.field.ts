import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { productEntity } from "../product.entity";


const validFields: (keyof productEntity)[] = [
  'id',
  'name',
];

@ValidatorConstraint({ name: 'IsValidFieldMeals', async: false })
export class IsValidFieldProduct implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return validFields.includes(value);
  }

  defaultMessage(): string {
    return `El campo sortBy debe ser uno de los siguientes: ${validFields.join(', ')}`;
  }
}
