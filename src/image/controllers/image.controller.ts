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

@Controller('users/:userId/portfolio/:portfolioId/image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  findAll(@Param('portfolioId') portfolioId): Promise<ImageEntity[]> {
    return this.imageService.findAll(portfolioId);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Param('portfolioId') portfolioId,
    @Body() image: ImageEntity,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.imageService.create(
      { ...image, portfolioId },
      file.buffer,
      file.originalname,
    );
  }
  @Delete(':imageId')
  remove(@Param('imageId') imageId) {
    this.imageService.remove(imageId);

    return 'Image was deleted';
  }

  @Put(':imageId')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('imageId') imageId,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const image = await this.imageService.findOne(imageId);
    return this.imageService.updateImage(
      imageId,
      image,
      file.buffer,
      file.originalname,
    );
  }

  @Post(':imageId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('imageId') imageId,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      return this.imageService.uploadSomething(file.originalname, file.buffer);
    } catch {
      return 'Cant do this anymore';
    }
  }
}
