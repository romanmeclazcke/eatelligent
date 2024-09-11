import { where } from 'sequelize';
import { authRepository } from 'src/Auth/domain/authRepository';
import { loginDto } from 'src/Auth/domain/dto/login.dto';
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

  async validateAccount(id: string): Promise<boolean | null> {
    const userUpdated = await User.update(
      { validateEmail: true },
      {
        where: { id: id },
      },
    );
    return userUpdated[0] > 0;
  }
}
