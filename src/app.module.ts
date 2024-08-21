import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './Session/session.module';
import { PostModule } from './Post/post.module';
import { LikeModule } from './Like/like.module';
import { FollowModule } from './Follow/follow.module';
import { CommentModule } from './Comment/comment.module';
import { FavoritePostModule } from './FavoritePost/favorite.post.module';
import { MealModule } from './Meal/meal.module';
import { ProductModule } from './Product/product.module';
import { DislikeProduct } from './DislikeProduct/dislike.product.module';
@Module({
  imports: [
    UserModule,
    SessionModule,
    PostModule,
    LikeModule,
    FollowModule,
    CommentModule,
    FavoritePostModule,
    MealModule,
    ProductModule,
    DislikeProduct
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
