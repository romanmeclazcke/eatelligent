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
import { dislikeProductUseCases } from 'src/DislikeProduct/application/dislike.product.use.cases';
import { Request, Response } from 'express';

@Controller('dislike-product')
export class dislikeProductController {
  constructor(
    private readonly dislikeProductUseCases: dislikeProductUseCases,
  ) {}

  @Get('/:userId')
  async getDislikeProduct(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.dislikeProductUseCases.getDislikeProduct(userId);

    if (result.isSucces) {
      res
        .status(result.statusCode)
        .json({ message: result.value, details: true });
    } else {
      res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
    }
  }

  @Post('add/user/:userId/product/:productId')
  async addDislikeProduct(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.dislikeProductUseCases.addDislikeProduct(
      userId,
      productId,
    );

    if (result.isSucces) {
      res
        .status(result.statusCode)
        .json({ message: result.value, details: true });
    } else {
      res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
    }
  }

  @Delete('delete/user/:userId/product/:productId')
  async deleteDislikeProduct(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.dislikeProductUseCases.deleteDislikeProduct(
      userId,
      productId,
    );

    if (result.isSucces) {
      res
        .status(result.statusCode)
        .json({ message: result.value, details: true });
    } else {
      res
        .status(result.statusCode)
        .json({ message: result.error, details: false });
    }
  }
}