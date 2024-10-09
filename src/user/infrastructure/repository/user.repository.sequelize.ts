import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domian/user.entity';
import { userRepository } from 'src/user/domian/user.repository';
import User from '../models/user.models';
import { CreateUserDto } from 'src/user/domian/dto/create.user.dto';
import { UpdateUserDto } from 'src/user/domian/dto/user.update';
import Follow from 'src/Follow/infrastructure/model/follow.model';
import { Op, Sequelize } from 'sequelize';
import { changePasswordDto } from 'src/Auth/domain/dto/change.password.dto';

@Injectable()
export class userRepositorySequelize implements userRepository {

  async getUsers(): Promise<UserEntity[] | null> {
    return await User.findAll();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return await User.findByPk(id, {
      attributes: [
        'name',
        'lastName',
        'userName',
        'profilePicture',
        'validateEmail',
      ],
    });
  }
  //add method findIfUserExist(); whithout attributes

  async getUserByEmail(email: string) {
    return await User.findOne({
      attributes: ['id'],
      where: { email: email },
    });
  }

  async getUserByUserName(userName: string) {
    return await User.findOne({
      attributes: ['id'],
      where: {
        userName: userName,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<UserEntity | null> {
    try {
      const createdUser = await User.create({
        ...user,
        birthdate: new Date(user.birthdate), // Conversión de string a Date
        validateEmail: false,
      });
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateUserInformation(
    user: UpdateUserDto,
    id: string,
  ): Promise<UserEntity | null> {
    const userUpdated = await User.update(user, {
      where: {
        id: id,
      },
    });
    return this.getUserById(id);
  }

  async updateProfilePicture(
    file: string,
    id: string,
  ): Promise<UserEntity | null> {
    const userUpdated = await User.update(
      { profilePicture: file },
      {
        where: { id: id },
      },
    );
    return this.getUserById(id);
  }

  async getRecomendationUsers(userId: string): Promise<UserEntity[] | null> {
    //traigo todos los usuarios que sigo
    const followedUsers = await Follow.findAll({
      where: {
        followerId: userId,
      },
      attributes: ['followedId'],
    });

    //extraigo el id de los resultados
    const followedIds = followedUsers.map((f) => f.followedId);
    console.log(followedIds);


    const seguiresSegudiosPorMisSeguidos = await Follow.findAll({ //refactorizar esto
      where: {
        followerId: {
          [Op.in]: followedIds
        }
      }
    })
    const test = seguiresSegudiosPorMisSeguidos.map((f) => f.followedId);
    console.log("Estos son los usuarios que tus usuarios seguidos siguen", test);

    const result = await User.findAll({ //traigo todos los usuarios que su id esta en la lista de usuarios que mis seguidos siguen
      where: {
        id: {
          [Op.in]: test
        }
      },
      attributes: ['id', 'username', 'profilePicture'], // Atributos del usuario
    });

    console.log(result);
    return result;
  }

   async changePassword(userId: string, changePasswordDto: changePasswordDto): Promise<UserEntity | null> {
       await User.update(
        { password: changePasswordDto.newPassword},{
        where:{
          id: userId
        }
      })
      return this.getUserById(userId);
  }

}
