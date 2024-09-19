import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,

} from '@nestjs/common';
import { Request , Response} from 'express';
import { mealHistoryUseCases } from 'src/MealHistory/application/meal.history.use.cases';


@Controller('history-meal')
export class mealHistoryController {
    constructor(private historyMealUseCases: mealHistoryUseCases){}

  @Get('/:userId')
  async getHistoryMeal(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.historyMealUseCases.getHistoryMeal(userId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }


  @Post('/:userId/add/:mealId')
  async addHistoryMeal(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.historyMealUseCases.addMealToHistory(userId,mealId);
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
