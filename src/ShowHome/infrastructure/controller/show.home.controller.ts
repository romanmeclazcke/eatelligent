import { Controller, Get, Param, ParseUUIDPipe, Req, Res } from "@nestjs/common";
import { showHomeUseCases } from "src/ShowHome/application/show.home.use.cases";
import { Request,Response } from "express";
@Controller('home')
export class showHomeController {

    constructor(private showHomeUseCases: showHomeUseCases) { }

    @Get('/:userId')
    async showHome(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const result = await this.showHomeUseCases.showHome(userId);
        result.isSucces
            ? res
                .status(result.statusCode)
                .json({ message: result.value, details: true })
            : res
                .status(result.statusCode)
                .json({ message: result.error, details: false });
    }

}