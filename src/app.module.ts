import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './Session/session.module';
@Module({
  imports: [UserModule,SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
