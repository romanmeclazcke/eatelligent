import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { favoriteMealUseCases } from 'src/FavoriteMeal/application/favorite.meal.use.cases';

@Controller('favorite-meals')
export class favoriteMealsController {
  constructor(private favoriteMealUseCases: favoriteMealUseCases) {}

  @Get('/show-all/:userId')
  async getAllFavoriteMeals(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.favoriteMealUseCases.getAllFavoriteMeal(userId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Post('/add/user/:userId/meal/:mealId')
  async addFavoriteMeal(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.favoriteMealUseCases.addFavoriteMeal(
      userId,
      mealId,
    );
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Delete('/delete/user/:userId/meal/:mealId')
  async deleteFavoriteMeal(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.favoriteMealUseCases.deleteFavoriteMeal(
      userId,
      mealId,
    );
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
