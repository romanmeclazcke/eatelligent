import { Injectable } from "@nestjs/common";
import { trasnlateService } from "../translate/translate.service";
const Filter = require('bad-words');

@Injectable()
export class badWordsService {

    private filter;

    constructor( private readonly trasnlateService:trasnlateService) {
        this.filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g });
    }

    async detectBadWords(text: string): Promise<boolean> {
        const textTraslated = await this.trasnlateService.translateText(text);
        console.log(textTraslated)
        const isProfane = this.filter.isProfane(textTraslated!="error"?textTraslated:text);
        return isProfane;
    }
}
