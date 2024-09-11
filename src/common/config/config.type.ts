import { FileConfig } from '@models/files/config/file-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  file: FileConfig;
};
