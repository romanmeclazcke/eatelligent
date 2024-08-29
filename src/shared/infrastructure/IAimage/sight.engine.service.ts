import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Result } from '../patternResult/result';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';


@Injectable()
export class SightEngineServices {
  constructor() {}
  async detectImage(imageUrl: string): Promise<Result<boolean>> {
    try {
      // Realiza la solicitud POST
      const response = await axios.get(
        'https://api.sightengine.com/1.0/check.json',
        {
          params: {
            url: imageUrl,
            models:
              'nudity-2.1,weapon,recreational_drug,medical,face-attributes,violence,self-harm,gambling',
            api_user: process.env.API_USER_IMAGE,
            api_secret: process.env.API_SECRET_IMAGE,
          },
        },
      );
    
      console.log('Response data:', response.data);
      const result =  this.detectProbabilities(response.data)
      if(result){ //contiene probabilidaddes mayor a 0.5
        console.log("Contiene contenido inapropiado")
          return Result.failure("inappropriate content",404);
      }
      console.log("safaste")
      return Result.succes(true,200)
  
    } catch (error) {
      console.error(
        'Error contacting SIGHTengine API:',
        error.message || error,
      );
      throw new HttpException(
        'Error contacting SIGHTengine API',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  public detectProbabilities(data: any): boolean {
    const nudity = (data.nudity && (
        data.nudity.sexual_activity > 0.5 ||
        data.nudity.sexual_display > 0.5 ||
        data.nudity.erotica > 0.5
    ));
    
    const weapon = (data.weapon && (
        data.weapon.classes.firearm > 0.5 ||
        data.weapon.classes.knife > 0.5
    ));
    
    const medical = (data.medical && data.medical.prob > 0.5);
    
    const violence = (data.violence && data.violence.prob > 0.5);
    
    const selfHarm = (data['self-harm'] && data['self-harm'].prob > 0.5);
    
    const gambling = (data.gambling && data.gambling.prob > 0.5);
    
    const result = nudity || weapon || medical || violence || selfHarm || gambling;
    
    return result;
}

}
