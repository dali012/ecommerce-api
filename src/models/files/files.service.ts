import { PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { AllConfigType } from '@config/config.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { transformUrl } from '@utils/url.transformer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.s3 = new S3Client({
      forcePathStyle: true,
      region: this.configService.getOrThrow('file.awsS3Region', {
        infer: true,
      }),
      endpoint: this.configService.getOrThrow('file.awsS3Endpoint', {
        infer: true,
      }),
      credentials: {
        accessKeyId: this.configService.getOrThrow('file.accessKeyId', {
          infer: true,
        }),
        secretAccessKey: this.configService.getOrThrow('file.secretAccessKey', {
          infer: true,
        }),
      },
    });
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadPromises = files.map(async (file) => {
      if (!file) {
        throw new BadRequestException('One or more files are missing');
      }

      const uuid = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const newFileName = fileExtension ? `${uuid}.${fileExtension}` : uuid;

      const params: PutObjectCommandInput = {
        Bucket: this.configService.getOrThrow('file.awsDefaultS3Bucket', {
          infer: true,
        }),
        Key: newFileName,
        ContentType: file.mimetype,
        Body: file.buffer,
      };

      const uploader = new Upload({
        client: this.s3,
        params,
      });

      try {
        const result = await uploader.done();
        const newUrl = transformUrl(result.Location);

        return {
          url: newUrl,
        };
      } catch (error) {
        throw new BadRequestException('File upload failed');
      }
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      throw new BadRequestException('One or more file uploads failed');
    }
  }
}
