import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { mealEntity } from '../meal.entity';

const validFields: (keyof mealEntity)[] = [
  'id',
  'name',
  'mealPicture',
  'recipe',
  'calories',
  'protein',
  'carbohydrates',
  'glutenFree',
];

@ValidatorConstraint({ name: 'IsValidFieldMeals', async: false })
export class IsValidFieldMeals implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return validFields.includes(value);
  }

  defaultMessage(): string {
    return `El campo sortBy debe ser uno de los siguientes: ${validFields.join(', ')}`;
  }
}
