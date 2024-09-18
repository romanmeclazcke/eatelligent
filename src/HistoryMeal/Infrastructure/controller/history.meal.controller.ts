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
import { historyMealUseCases } from 'src/HistoryMeal/application/history.meal.use.cases';


@Controller('history-meal')
export class historyMealController {
    constructor(private historyMealUseCases: historyMealUseCases){}

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
