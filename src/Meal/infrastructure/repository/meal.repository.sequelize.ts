import { Injectable } from "@nestjs/common";
import { mealCreateDto } from "src/Meal/domain/dto/meal.create.dto";
import { mealUpdateDto } from "src/Meal/domain/dto/meal.update.dto";
import { mealEntity } from "src/Meal/domain/meal.entity";
import { mealRepository } from "src/Meal/domain/meal.repository";
import Meal from "../model/meal.model";
import Product from "src/Product/infrastructure/model/product.model";
import DislikeProduct from "src/DislikeProduct/infrastructure/model/dislike.product.model";
import { Op } from 'sequelize';

@Injectable()
export class mealRepositorySequelize implements mealRepository{

    async getMealsByTastes(userId: string): Promise<mealEntity[] | null> {
        const dislikeProducts = await DislikeProduct.findAll({
            attributes: ['productId'],  
            where: {
                userId: userId
            }
        });
        

        if(dislikeProducts.length==0){//no tiene productos que no le gusten entonces retorno todas las comidas
            return await Meal.findAll();
        }


        const dislikedProductIds = dislikeProducts.map(dislike => dislike.productId);

        return await Meal.findAll({
            include: [{
                model: Product,
                attributes: [], // No necesitas los atributos del modelo `Product` aquí
                through: { attributes: [] },
                where: {
                    id: {
                        [Op.notIn]: dislikedProductIds //revisar error (si el la comida tiene un producto que al usario le gusta la muestra igual aunque tenga otros que no)
                    }
                }
            }]
        });
        //obtener todas las comidas que no incluyen productos que al usuario no le gustan.
    }
    async getMealById(mealId: string): Promise<mealEntity | null> {
        return await Meal.findOne({
            where:{
                id:mealId
            },
            include: [{
                model: Product,
                through: { attributes: [] }, // Opcional, para no traer los atributos de la tabla intermedia 
            }]
        })
    }
    async createMeal(mealCreateDto: mealCreateDto): Promise<Meal | null> {
        return await Meal.create({
            ...mealCreateDto
        })
    }
    async updateMeals(mealId: string, mealUpdateDto: mealUpdateDto): Promise<mealEntity | null> {
        const [affectedRows] = await Meal.update(mealUpdateDto, {
            where: {
              id: mealId,
            },
        });

        if(affectedRows==0){
            return null
        }

        return this.getMealById(mealId)
    }
    async deleteMeal(mealId: string): Promise<number | null> {
        return await Meal.destroy({
            where:{
                id: mealId
            }
        })
    }

}