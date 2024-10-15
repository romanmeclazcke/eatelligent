import { productCreateDto } from "src/Product/domain/dto/product.create.dto";
import { productUpdateDto } from "src/Product/domain/dto/product.update.dto";
import { productEntity } from "src/Product/domain/product.entity";
import { productRepository } from "src/Product/domain/product.repository";
import Product from "../model/product.model";
import { Injectable } from "@nestjs/common";
import { productOrderParams } from "src/Product/domain/dto/productOrderParams";


@Injectable()
export class productRepositorySequelize implements productRepository{

    async getAllProducts(productOrderParams:productOrderParams): Promise<productEntity[] | null> {
        const options: any = {};

        // applied order if exist
        if (productOrderParams.sort) {
          options.order = [[productOrderParams.sort, productOrderParams.order || 'asc']]; //['field','order']
        }
    
        const meals = await Product.findAll(options); //if dont exist order will response normal
    
        return meals;
    }
    
    async createProduct(productCreatoDto: productCreateDto): Promise<productEntity | null> {
        return await Product.create({...productCreatoDto})
    }

    async editProduct(productId: string, productUpdateDto: productUpdateDto): Promise<productEntity | null> {
            // Obtén el producto existente como una instancia del modelo
            const product = await Product.findByPk(productId);
    
            // Verifica si el producto existe
            if (!product) {
                return null;
            }
            console.log(productUpdateDto.name)
            // Actualiza los campos del producto basado en el DTO
            if (productUpdateDto.name !== undefined) {
                product.name = productUpdateDto.name;
            }
            console.log(productUpdateDto.productImage);
            if (productUpdateDto.productImage !== null) {
                product.productImage = productUpdateDto.productImage;
            }
    
            // Guarda los cambios en la base de datos
            await product.save();

            return  this.getProductById(productId);
    }
    
    


    async deleteProduct(productId: string): Promise<number | null> {
        return await Product.destroy({
            where:{
                id:productId
            }
        })
    }

    async getProductByName(productName: string): Promise<productEntity | null> {
        return await Product.findOne({
            where:{
                name:productName
            }
        })
    }

    async getProductById(productId: string): Promise<productEntity | null> {
       return await Product.findByPk(productId);
    }
    
}