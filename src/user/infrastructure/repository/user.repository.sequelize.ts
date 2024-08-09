import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domian/user.entity';
import { userRepository } from 'src/user/domian/user.repository';
import User from '../models/user.models';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';
import { create } from 'domain';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';
import { where } from 'sequelize';

@Injectable()
export class userRepositorySequelize implements userRepository {
    
    
    async  getUsers(): Promise<UserEntity[] | null> {
        const user =await User.findAll()
        return user
    }
    
    async getUserById(id:string): Promise<UserEntity | null> {
        return await User.findByPk(id)
    }
    
    async getUserByEmail(email: string) {
        return await User.findOne({
            attributes: ['id'] ,
            where:{email:email},
            
        })
    }
    
    async getUserByUserName(userName: string) {
        return await User.findOne({
            attributes:['id'],
            where:{
                userName:userName
            }
        })
    }
    
    async createUser(user: CreateUserDto): Promise<UserEntity | null> {
        try {
            const createdUser = await User.create({
                ...user, 
                birthdate: new Date(user.birthdate) // Conversión de string a Date
            });
            return createdUser;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }
    
    async updateUserInformation(user: UpdateUserDto,id:string): Promise<UserEntity | null> {
        const userUpdated= await User.update(user,{
                where:{
                    id:id
                }
            }
        )
        return this.getUserById(id);
    }
    

    
}
