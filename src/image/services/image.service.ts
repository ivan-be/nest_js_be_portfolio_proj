import { Injectable } from '@nestjs/common';
import { ImageEntity } from '../image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
    },
  });
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly configService: ConfigService,
  ) {}
  async create(createImage: ImageEntity, file, fileName): Promise<ImageEntity> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('BUCKET'),
        Key: fileName,
        Body: file,
        ContentType: 'image/png',
      }),
    );
    const region = this.configService.getOrThrow('AWS_S3_REGION');

    return this.imageRepository.save({
      ...createImage,
      source: `https://coll-bucket.s3.${region}.amazonaws.com/${fileName}`,
    });
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
  async updateImage(
    id: number,
    image: ImageEntity,
    newImage: Buffer,
    fileName: string,
  ) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('BUCKET'),
        Key: fileName,
        Body: newImage,
      }),
    );
    const region = this.configService.getOrThrow('AWS_S3_REGION');
    return this.imageRepository.update(id, {
      source: `https://coll-bucket.s3.${region}.amazonaws.com/${fileName}`,
    });
  }
  async uploadSOmething(fileName: string, file: Buffer) {
    await this.s3Client
      .send(
        new PutObjectCommand({
          Bucket: 'coll-bucket',
          Key: fileName,
          Body: file,
        }),
      )
      .then((data) => console.log(data));
  }
}
