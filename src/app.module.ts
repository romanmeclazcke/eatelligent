import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './Session/session.module';
import { PostModule } from './Post/post.module';
import { LikeModule } from './Like/like.module';
import { FollowModule } from './Follow/follow.module';
import { CommentModule } from './Comment/comment.module';
@Module({
  imports: [UserModule,SessionModule,PostModule,LikeModule,FollowModule,CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
