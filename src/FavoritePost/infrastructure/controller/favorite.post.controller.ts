import { Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, Res } from "@nestjs/common";
import { favoritePostUseCases } from "src/FavoritePost/application/favorite.post.use.cases";
import { Request,Response } from "express";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('favorite-post')
@Controller('favorite-post')
export class favoritePostController{

    constructor(private favoritePostUseCases:favoritePostUseCases){}


    @Get('/all/:userId')
    async getFavoritePost(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Req() req: Request,
        @Res() res: Response,
    ){
        const result = await this.favoritePostUseCases.getFavoritePost(userId)
        
        result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });
    }


    @Post('/add/:userId/post/:postId')
    async addFavoritePost(
        @Param('userId', ParseUUIDPipe) userId:string,
        @Param('postId', ParseUUIDPipe) postId:string,
        @Req() req: Request,
        @Res() res: Response,
    ){
        const result = await this.favoritePostUseCases.addFavoritePost(userId,postId)
        
        result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });
    }

    @Delete('/remove/:favoritePostId')
    async deleteFavoritePost(
        @Param('favoritePostId', ParseUUIDPipe) favoritePostId:string,
        @Req() req: Request,
        @Res() res: Response,
    ){
        const result = await this.favoritePostUseCases.deleteFavoritePost(favoritePostId)
        
        result.isSucces?
      res.status(result.statusCode).json({ message: result.value, details: true }):
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
}