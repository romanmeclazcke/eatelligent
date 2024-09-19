import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './Post/post.module';
import { LikeModule } from './Like/like.module';
import { FollowModule } from './Follow/follow.module';
import { CommentModule } from './Comment/comment.module';
import { FavoritePostModule } from './FavoritePost/favorite.post.module';
import { MealModule } from './Meal/meal.module';
import { ProductModule } from './Product/product.module';
import { DislikeProductModule } from './DislikeProduct/dislike.product.module';
import { FavoriteMealModule } from './FavoriteMeal/favorite.meal.module';
import { AuthModule } from './Auth/auth.module';
import { MealHistoryModule } from './MealHistory/history.meal.module';
@Module({
  imports: [
    UserModule,
    PostModule,
    LikeModule,
    FollowModule,
    CommentModule,
    FavoritePostModule,
    MealModule,
    ProductModule,
    DislikeProductModule,
    FavoriteMealModule,
    AuthModule,
    MealHistoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
