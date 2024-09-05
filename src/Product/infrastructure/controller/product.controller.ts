import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { productUseCases } from 'src/Product/application/product.use.cases';
import { productCreateDto } from 'src/Product/domain/dto/product.create.dto';
import { Request, Response } from 'express';
import { productUpdateDto } from 'src/Product/domain/dto/product.update.dto';

@Controller('product')
export class productController {
  constructor(private productUseCases: productUseCases) {}

  @Post('/new')
  @UseInterceptors(FileInterceptor('productImage'))
  async createPost(
    @Body() producCreateDto: productCreateDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productUseCases.createProduct(
      producCreateDto,
      file,
    );
    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }

  @Patch('/edit/:productId')
  @UseInterceptors(FileInterceptor('productImage'))
  async updatePost(
    @Body() productUpdateDto: productUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productUseCases.editProduct(
      productId,
      productUpdateDto,
      file,
    );

    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
  @Delete('/delete/:productId')
  async deletePost(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.productUseCases.deleteProduct(productId);

    result.isSucces
      ? res
          .status(result.statusCode)
          .json({ message: result.value, details: true })
      : res
          .status(result.statusCode)
          .json({ message: result.error, details: false });
  }
}
