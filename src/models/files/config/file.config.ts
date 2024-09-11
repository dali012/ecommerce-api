import { registerAs } from '@nestjs/config';
import validateConfig from '@utils/validate-config';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileConfig } from './file-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  SECRET_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_DEFAULT_S3_BUCKET: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_REGION: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_ENDPOINT: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
    awsS3Region: process.env.AWS_S3_REGION,
    awsS3Endpoint: process.env.AWS_S3_ENDPOINT,
  };
});
