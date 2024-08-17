import { Injectable } from "@nestjs/common";
const Filter = require('bad-words');

@Injectable()
export class badWordsService {

    private filter;

    constructor() {
        this.filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g });
    }

    async detectBadWords(text: string): Promise<boolean> {
        const isProfane = this.filter.isProfane(text);
        return isProfane;
    }
}
