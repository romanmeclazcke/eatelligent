import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class trasnlateService {
  private readonly baseUrl = 'https://api.mymemory.translated.net/get';

  async translateText(text: string): Promise<string> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          q: text,
          langpair: `es|en`,
        },
      });

      return response.data.responseData.translatedText;
    } catch (error) {
      return "error"
    }
  }
}
