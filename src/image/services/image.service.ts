import { Injectable } from '@nestjs/common';
import { ImageEntity } from '../image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}
  create(createImage: ImageEntity): Promise<ImageEntity> {
    return this.imageRepository.save(createImage);
  }
  async findAll(portfolioId: number): Promise<ImageEntity[]> {
    return this.imageRepository.find({ where: [{ portfolioId: portfolioId }] });
  }
  async remove(imageId): Promise<void> {
    await this.imageRepository.remove(imageId);
  }
  async findOne(imageId: number): Promise<ImageEntity> {
    return this.imageRepository.findOne({ where: [{ id: imageId }] });
  }
  async updateImage(id: number, image: ImageEntity, newImage) {
    try {
      return this.imageRepository.update(id, { ...image, source: newImage });
    } catch {
      return 'To bad for you, it is not working';
    }
  }
}
