import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { ImageEntity } from '../image.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users/:userId/portfolio/:portfolioId/image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  findAll(@Param('portfolioId') portfolioId): Promise<ImageEntity[]> {
    return this.imageService.findAll(portfolioId);
  }
  @Post()
  create(@Param('portfolioId') portfolioId, @Body() image: ImageEntity) {
    return this.imageService.create({ ...image, portfolioId });
  }
  @Delete(':imageId')
  remove(@Param('imageId') imageId) {
    return this.imageService.remove(imageId);
  }

  @Put(':imageId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async upload(
    @Param('imageId') imageId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const image = await this.imageService.findOne(imageId);
      return this.imageService.updateImage(imageId, image, file);
    } catch {
      return 'Cant do this anymore';
    }
  }
}
