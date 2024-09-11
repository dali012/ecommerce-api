import {
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileUploadExceptionFactory } from './exceptions/file.exception';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({
            maxSize: 5242880,
            message: 'File too large max 5MB',
          }),
        ],
        exceptionFactory: fileUploadExceptionFactory,
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return await this.filesService.uploadFiles(files);
  }
}
