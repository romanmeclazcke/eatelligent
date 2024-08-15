import { Controller, Delete, Param, ParseUUIDPipe, Post, Req, Res } from "@nestjs/common";
import { followUseCases } from "src/Follow/application/follow.use.cases";
import { Request,Response } from "express";

@Controller('follow')
export class followController{

    constructor(private followUseCases: followUseCases){}


    @Post('/:followerId/:followedId')
    async followUser(
        @Param('followerId', ParseUUIDPipe) followerId: string,
        @Param('followedId', ParseUUIDPipe) followedId: string,
        @Req() request: Request,
        @Res() res: Response,
    ){
        
    const result = await this.followUseCases.followUser(followerId,followedId);
    if (result.isSucces) {
      res.status(result.statusCode).json({ message: result.value, details: true });
    } else {
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
    }
    

    @Delete('/:followerId/:followedId')
    async unFollowUser(
        @Param('followerId', ParseUUIDPipe) followerId: string,
        @Param('followedId', ParseUUIDPipe) followedId: string,
        @Req() request: Request,
        @Res() res: Response,
    ){
        
    const result = await this.followUseCases.unFollowUser(followerId,followedId);
    if (result.isSucces) {
      res.status(result.statusCode).json({ message: result.value, details: true });
    } else {
      res.status(result.statusCode).json({ message: result.error, details: false });
    }
    }

}