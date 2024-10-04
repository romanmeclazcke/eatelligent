import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { mealEntity } from '../domain/meal.entity';
import { mealRepositorySequelize } from '../infrastructure/repository/meal.repository.sequelize';
import { mealCreateDto } from '../domain/dto/meal.create.dto';
import { mealUpdateDto } from '../domain/dto/meal.update.dto';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { CloudinaryService } from 'src/Shared/infrastructure/cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mealUseCases {
  constructor(
    private mealRepository: mealRepositorySequelize,
    private userRepository: userRepositorySequelize,
    private cloudinary: CloudinaryService,
  ) { }
  

  async getMeals(): Promise<Result<mealEntity[] | null>>{
    const meals= await this.mealRepository.getMeals();
    
    if(meals){
      return Result.succes(meals,200);
    }
    return Result.failure("Meals not found",404)
  }

  async getMealsByTastes(userId: string): Promise<Result<mealEntity[] | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }
    const meals = await this.mealRepository.getMealsByTastes(userId);

    if (meals) {
      return Result.succes(meals, 200);
    }
    return Result.failure("meals not founds", 404)
  }

  async getMealById(mealId: string): Promise<Result<mealEntity | null>> {
    const meal = await this.mealRepository.getMealById(mealId);

    if (meal) {
      return Result.succes(meal, 200)
    }
    return Result.failure('Meal not found', 404);
  }

  async deleteMeal(mealId: string): Promise<Result<mealEntity | null>> {
    const meal = await this.mealRepository.getMealById(mealId);

    if (!meal) {
      return Result.failure('Meal not found', 404);
    }

    const mealDeleted = await this.mealRepository.deleteMeal(mealId);
    this.cloudinary.deleteImage(meal.mealPicture); //no necesito que el proceso sea asincronico, realmente no me interesa el resultado

    if (mealDeleted > 0) {
      return Result.succes(meal, 200);
    }

    return Result.failure('Internal server error', 500);
  }

  async createMeal(
    mealCreateDto: mealCreateDto,
    file: Express.Multer.File,
  ): Promise<Result<mealEntity | null>> {
    let mealImage: string | null = null;

    // if (file) {
    //   try {
    //     const uploadResult = await this.cloudinary.uploadImage(file);
    //     mealImage = uploadResult.url;
    //   } catch (uploadError) {
    //     return Result.failure('Failed to upload image', 500);
    //   }
    // }

    const mealToCreate: mealCreateDto = {
      ...mealCreateDto,
      mealPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh6cOMOl7iTHblduozB1vGzuBXw4uU0iQMVw&s",
    };

    // Aquí, `createMeals` debe crear una nueva comida y devolver la instancia creada
    const meal = await this.mealRepository.createMeal(mealToCreate);
    console.log(meal)

    if (meal) {
      // Si se proporcionan IDs de productos, asocia los productos con la comida
      if (mealCreateDto.productsId && mealCreateDto.productsId.length > 0) {
        await meal.addProducts(mealCreateDto.productsId)
      }
      return Result.succes(meal, 201);
    }

    return Result.failure('Internal server error', 500);
  }

  async updateMeal( //refactorizar todo
    mealId: string,
    mealUpdateDto: mealUpdateDto,
    file: Express.Multer.File,
  ): Promise<Result<mealEntity | null>> {

    let mealImage: string | null = null;
    if (file) {
      try {
        const uploadResult = await this.cloudinary.uploadImage(file, "meal_picture");
        mealImage = uploadResult.url;
      } catch (uploadError) {
        return Result.failure('Failed to upload image', 500);
      }
    }

    const mealToUpdate: mealUpdateDto = {
      ...mealUpdateDto,
      image: mealImage,
    };

    const meal = await this.mealRepository.updateMeals(mealId, mealToUpdate);

    if (meal) {
      return Result.succes(meal, 201);
    }

    return Result.failure('Internal srever error', 500);

  }
}
