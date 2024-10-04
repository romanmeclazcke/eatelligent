import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Result } from '../patternResult/result';
import { SightEngineServices } from '../IAimage/sight.engine.service';

@Injectable()
export class CloudinaryService {
  constructor(private imageServices: SightEngineServices) { }


  async handlePictures(file: Express.Multer.File, folder: string): Promise<string | 'prohibited' | 'uploadError'> {
    if (!file) return null;
    try {
      const uploadResult = await this.uploadImage(file, folder);
      const profilePictureUrl = uploadResult.url;

      const resultDetection = await this.imageServices.detectImage(profilePictureUrl);
      if (!resultDetection.isSucces) {
        await this.deleteImage(profilePictureUrl);
        return 'prohibited';
      }

      return profilePictureUrl;
    } catch (error) {
      return 'uploadError';
    }
  }

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
      return Result.failure("invalid format url", 404)
    }

    try {
      const result = await v2.uploader.destroy(publicId);
      if (result.result === 'ok') {
        return Result.succes("image Deleted", 200);
      }
      return Result.failure("error to deleted image", 500);
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