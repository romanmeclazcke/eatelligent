import { Result } from 'src/shared/infrastructure/patternResult/result';
import { mealEntity } from '../domain/meal.entity';
import { mealRepositorySequelize } from '../infrastructure/repository/meal.repository.sequelize';
import { mealCreateDto } from '../domain/dto/meal.create.dto';
import { mealUpdateDto } from '../domain/dto/meal.update.dto';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { CloudinaryService } from 'src/shared/infrastructure/cloudinary/cloudinary.service';


export class mealUseCases {
  constructor(
    private mealRepository: mealRepositorySequelize,
    private userRepository: userRepositorySequelize,
    private cloudinary: CloudinaryService,
  ) {}

  async getMealsByTastes(userId: string): Promise<Result<mealEntity[] | null>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not found', 404);
    }
  }

  async deleteMeal(mealId: string): Promise<Result<mealEntity | null>> {
    const meal = await this.mealRepository.getMealsById(mealId);

    if (!meal) {
      return Result.failure('Meal not found', 404);
    }

    const mealDeleted = await this.mealRepository.deleteMeal(mealId);
    this.cloudinary.deleteImage(meal.image); //no necesito que el proceso sea asincronico, realmente no me interesa el resultado

    if (mealDeleted>0) {
      return Result.succes(meal, 200);
    }

    return Result.failure('Internal server error', 500);
  }

  async createMeal(
    mealCreateDto: mealCreateDto,
    file: Express.Multer.File,
  ): Promise<Result<mealEntity | null>> {
    let mealImage: string | null = null;

    if (file) {
      try {
        const uploadResult = await this.cloudinary.uploadImage(file);
        mealImage = uploadResult.url;
      } catch (uploadError) {
        return Result.failure('Failed to upload image', 500);
      }
    }

    const mealToCreate: mealCreateDto = {
      ...mealCreateDto,
      image: mealImage,
    };

    const meal = await this.mealRepository.createMeals(mealToCreate);

    if (meal) {
      return Result.succes(meal, 201);
    }

    return Result.failure('Internal srever error', 500);
  }

  async updateMeal(
    mealId: string,
    mealUpdateDto: mealUpdateDto,
    file: Express.Multer.File,
  ): Promise<Result<mealEntity | null>> {

    let mealImage: string | null = null;
    if (file) {
        try {
          const uploadResult = await this.cloudinary.uploadImage(file);
          mealImage = uploadResult.url;
        } catch (uploadError) {
          return Result.failure('Failed to upload image', 500);
        }
      }
  
      const mealToUpdate: mealUpdateDto = {
        ...mealUpdateDto,
        image: mealImage,
      };
  
      const meal = await this.mealRepository.updateMeals(mealId,mealToUpdate);
  
      if (meal) {
        return Result.succes(meal, 201);
      }
  
      return Result.failure('Internal srever error', 500);
    
  }
}
