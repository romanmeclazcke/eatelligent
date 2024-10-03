import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Result } from '../patternResult/result';

@Injectable()
export class CloudinaryService {


  async uploadImage(
    file: Express.Multer.File,
    folder: string, // Agregamos un parámetro para la carpeta
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
        quality: 'auto',
        fetch_format: 'auto',
        transformation: [
          {
            width: 800,
            height: 600, 
            crop: 'limit', 
          }
        ],
        folder: folder // Especifica la carpeta donde se subirá la imagen
      }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicUrl: string): Promise<Result<string>> {
    const publicId = this.extractPublicIdFromUrl(publicUrl);
    if (!publicId) {
      return Result.failure("invalid format url",404)
    }

    try {
      const result = await v2.uploader.destroy(publicId);
      if (result.result === 'ok') {
        return Result.succes("image Deleted",200);
      } 
      return Result.failure("error to deleted image",500);
    } catch (error) {
      throw error; 
    }
  }

  // Método privado para extraer el public_id de la secure_url
  private extractPublicIdFromUrl(url: string): string | null {
    // Expresión regular ajustada para extraer el public_id
    const regex = /\/upload\/v\d+\/([^./]+)\./;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}