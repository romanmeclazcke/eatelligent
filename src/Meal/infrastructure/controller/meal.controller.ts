import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { mealUseCases } from "src/Meal/application/meal.use.cases";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { mealCreateDto } from "src/Meal/domain/dto/meal.create.dto";
import { mealUpdateDto } from "src/Meal/domain/dto/meal.update.dto";

@Controller('meal')
export class mealController{

    constructor(private mealUseCases:mealUseCases){}


    @Get('show-all/:userId')
    async getMealsByTestes(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Req() req: Request,
        @Res() res: Response,
    ){
        const result = await this.mealUseCases.getMealsByTastes(userId)
      if (result.isSucces) {
          return res.status(result.statusCode).json({ message: result.value, details: true });
        }
        res.status(result.statusCode).json({ message: result.error, details: false });

    }

    @Get('show/:mealId')
    async getMealById(
        @Param('mealId', ParseUUIDPipe) mealId: string,
        @Req() req: Request,
        @Res() res: Response,
    ){
        const result = await this.mealUseCases.getMealById(mealId)
      if (result.isSucces) {
          return res.status(result.statusCode).json({ message: result.value, details: true });
        }
        res.status(result.statusCode).json({ message: result.error, details: false });

    }

    @Delete('/delete/:mealId')
    async dislikePost(
        @Param('mealId', ParseUUIDPipe) mealId: string,
        @Req() req: Request,
        @Res() res: Response,
      ) {
        const result = await this.mealUseCases.deleteMeal(mealId);
        if (result.isSucces) {
          res.status(result.statusCode).json({ message: result.value, details: true });
        } else {
          res.status(result.statusCode).json({ message: result.error, details: false });
        }
    }


    @Post('/new')
    //@UseInterceptors(FileInterceptor('mealPicture'))
    async createMeal(
    @Body() mealCreateDto: mealCreateDto,
    //@UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.mealUseCases.createMeal(mealCreateDto,undefined);
    if (result.isSucces) {
      res.status(result.statusCode).json({ message: result.value, details: true });
    } else {
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
  }


  @Patch('/edit/:mealId')
    @UseInterceptors(FileInterceptor('mealPicture'))
    async updateMeal(
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Body() mealUpdateDto: mealUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.mealUseCases.updateMeal(mealId,mealUpdateDto,file);
    if (result.isSucces) {
      res.status(result.statusCode).json({ message: result.value, details: true });
    } else {
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
  }
}