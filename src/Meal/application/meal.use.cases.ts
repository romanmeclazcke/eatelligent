import { mealRepositorySequelize } from "../infrastructure/repository/meal.repository.sequelize";

export class mealUseCases{
    constructor(private mealRepository:mealRepositorySequelize){}
}