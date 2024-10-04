
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { SightEngineServices } from '../IAimage/sight.engine.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, SightEngineServices],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}