import { Injectable } from '@nestjs/common';
import { productRepositorySequelize } from '../infrastructure/repository/product.repository.sequelize';
import { productCreateDto } from '../domain/dto/product.create.dto';
import { productUpdateDto } from '../domain/dto/product.update.dto';
import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { productEntity } from '../domain/product.entity';
import { CloudinaryService } from 'src/Shared/infrastructure/cloudinary/cloudinary.service';
import { productOrderParams } from '../domain/dto/productOrderParams';

@Injectable()
export class productUseCases {
  constructor(
    private productRepository: productRepositorySequelize,
    private cloudinary: CloudinaryService,
  ) {}

  async getAllProducts(productOrderParams:productOrderParams):Promise<Result<productEntity[]|null>>{
    const products= await this.productRepository.getAllProducts(productOrderParams);

    if(products) return Result.succes(products,200);

    return Result.failure("Products not found",404);
  }

  async createProduct(  //refactorizar
    productCreateDto: productCreateDto,
    productImage: Express.Multer.File,
  ): Promise<Result<productEntity | null>> {
    const existProduct = await this.productRepository.getProductByName(
      productCreateDto.name,
    );

    if (existProduct) {
      return Result.failure('Product already exists', 404);
    }

    if (!productImage) {
      return Result.failure('Product need a image', 404);
    }

    let productImageUrl: string | null = null;
    try {
      const uploadResult = await this.cloudinary.uploadImage(productImage,"product_picture");
      productImageUrl = uploadResult.url;
    } catch (uploadError) {
      return Result.failure('Failed to upload image', 500);
    }

    const productToCreate: productCreateDto = {
      ...productCreateDto,
      productImage: productImageUrl,
    };

    const productCreated =
      await this.productRepository.createProduct(productToCreate);

    if (productCreated) {
      return Result.succes(productCreated, 200);
    }
    return Result.failure('Internal server error', 500);
  }

  async editProduct( //refactorizar
    productId: string,
    productUpdateDto: productUpdateDto,
    productImage: Express.Multer.File,
  ): Promise<Result<productEntity | null>> {
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      return Result.failure('Product not found', 404);
    }

    let productImageUrl: string | null = null;

    if (productImage) {
      try {
        const uploadResult = await this.cloudinary.uploadImage(productImage,"product_picture");
        productImageUrl = uploadResult.url;
        this.cloudinary.deleteImage(product.productImage); //elimino la imagen dee cloudinary para no desperciar almacenamiento en imagenes no utilizadas
      } catch (uploadError) {
        return Result.failure('Failed to upload image', 500);
      }
    }

    const productUpdate:productUpdateDto={
        ...productUpdateDto,
        productImage: productImageUrl,
    }
    const productEdited= await this.productRepository.editProduct(productId,productUpdate)

    if(productUpdate){
        return Result.succes(productEdited,200);
    }
    return Result.failure("Internal server error",500)
  }

  async deleteProduct(productId: string): Promise<Result<string | null>> {
    const product= await this.productRepository.getProductById(productId)
    this.cloudinary.deleteImage(product.productImage);
    const productDeleted =await this.productRepository.deleteProduct(productId);
    

    if (productDeleted) {
      return Result.succes('Product deleted', 200);
    }
    return Result.failure('Product not found', 404);
  }
}
