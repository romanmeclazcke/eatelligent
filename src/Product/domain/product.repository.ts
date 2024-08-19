import { productCreateDto } from "./dto/product.create.dto";
import { productUpdateDto } from "./dto/product.update.dto";
import { productEntity } from "./product.entity";

export interface productRepository{
    createProduct(productCreatoDto: productCreateDto): Promise<productEntity|null>
    editProduct(productId:string,productUpdateDto:productUpdateDto):Promise<productEntity|null>;
    deleteProduct(productId:string):Promise<number|null>;
    getProductByName(productName:string):Promise<productEntity|null>;
    getProductById(productId:string):Promise<productEntity|null>;
}