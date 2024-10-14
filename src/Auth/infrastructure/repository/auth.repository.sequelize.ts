import { where } from 'sequelize';
import { authRepository } from 'src/Auth/domain/authRepository';
import { loginDto } from 'src/Auth/domain/dto/login.dto';
import { resetPasswordDto } from 'src/Auth/domain/dto/reset.password.dto';
import { UserEntity } from 'src/user/domian/user.entity';
import User from 'src/user/infrastructure/models/user.models';

export class authRepositorySequelize implements authRepository {
  async validateUser(loginDto: loginDto): Promise<UserEntity | null> {
    return await User.findOne({
      where: {
        email: loginDto.email,
      },
    });
  }

  async validateAccount(userId: string): Promise<boolean | null> {
    const userUpdated = await User.update(
      { validateEmail: true },
      {
        where: { id: userId },
      },
    );
    return userUpdated[0] > 0;
  }

  async resetPassword(userId:string, newPassword:string):Promise<boolean|null>{
    const userUpdated = await User.update(
      { password: newPassword },
      {
        where: { id: userId },
      },
    );
    return userUpdated[0] > 0;
  }
}
