import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Result } from '../patternResult/result';
import axios from 'axios';


@Injectable()
export class SightEngineServices {
  constructor() {}
  async detectImage(imageUrl: string): Promise<Result<boolean>> {
    try {
      
      const response = await axios.get(
        'https://api.sightengine.com/1.0/check.json',
        {
          params: {
            url: imageUrl,
            models:
              'nudity-2.1,weapon,recreational_drug,violence,self-harm',
            api_user: process.env.API_USER_IMAGE,
            api_secret: process.env.API_SECRET_IMAGE,
          },
        },
      );
    
      
      const result =  this.detectProbabilities(response.data)
      if(result){ //contiene probabilidades mayor a 0.5
          return Result.failure("inappropriate content",404);
      }
     
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
    const percentageLimit = 0.5
    const nudity = (data.nudity && (
        data.nudity.sexual_activity > percentageLimit ||
        data.nudity.sexual_display >percentageLimit ||
        data.nudity.erotica > percentageLimit
    ));
    
    const weapon = (data.weapon && (
        data.weapon.classes.firearm > percentageLimit || 
        data.weapon.classes.knife > percentageLimit
    ));
    
    const medical = (data.medical && data.medical.prob > percentageLimit);
    
    const violence = (data.violence && data.violence.prob > percentageLimit);
    
    const selfHarm = (data['self-harm'] && data['self-harm'].prob > percentageLimit);
    
    const gambling = (data.gambling && data.gambling.prob > percentageLimit);
    
    const result = nudity || weapon || medical || violence || selfHarm || gambling;
    
    return result;
}

}
