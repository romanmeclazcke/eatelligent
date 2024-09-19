import { Injectable, Res } from '@nestjs/common';
import { dislikeProductRepositorySequelize } from '../infrastructure/repository/dislike.product.repository.sequelize';
import { Result } from 'src/Shared/infrastructure/patternResult/result';
import { dislikeProductEntity } from '../domain/dislike.product.entity';
import { userRepositorySequelize } from 'src/user/infrastructure/repository/user.repository.sequelize';
import { productRepositorySequelize } from 'src/Product/infrastructure/repository/product.repository.sequelize';

@Injectable()
export class dislikeProductUseCases {
  constructor(
    private dislikeProductRepository: dislikeProductRepositorySequelize,
    private userRepository: userRepositorySequelize,
    private productRepository: productRepositorySequelize,
  ) {}

  async getDislikeProduct(
    userId: string,
  ): Promise<Result<dislikeProductEntity[]>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not exist', 404);
    }

    const dislikeProduct =
      await this.dislikeProductRepository.getDislikeProduct(userId);

    if (dislikeProduct) {
      return Result.succes(dislikeProduct, 200);
    }
    return Result.failure('not exist dislike product to user', 404);
  }

  async addDislikeProduct(
    userId: string,
    productId: string,
  ): Promise<Result<dislikeProductEntity>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not exist', 404);
    }
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      return Result.failure('Product not exist', 404);
    }

    const existDislikeProduct =
      await this.dislikeProductRepository.findDislikedProduct(
        userId,
        productId,
      );

    if (existDislikeProduct) {
      return Result.failure('your already added this product', 404);
    }

    const dislikeProductCreated =await this.dislikeProductRepository.addDislikeProduct(userId, productId);
    if (dislikeProductCreated) {
      return Result.succes(dislikeProductCreated, 201);
    }
    return Result.failure('internal server error', 500);
  }

  async deleteDislikeProduct(
    userId: string,
    productId: string,
  ): Promise<Result<string>> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return Result.failure('User not exist', 404);
    }
    const product = await this.productRepository.getProductById(productId);

    if (!product) {
      return Result.failure('Product not exist', 404);
    }

    const dislikeProductDeleted =
      await this.dislikeProductRepository.deleteDislikeProduct(
        userId,
        productId,
      );

    if (dislikeProductDeleted) {
      return Result.succes('Dislike product deleted', 201);
    }

    return Result.failure('dislike product not exist', 404);
  }
}
