import { BadRequestException } from '@nestjs/common';

export const fileUploadExceptionFactory = (errors: any) => {
  if (Array.isArray(errors)) {
    const errorMessages = errors.map((err) => {
      if (err.type === 'fileType') {
        return 'Invalid file type. Only image files are allowed.';
      }
      return err.message || 'Invalid file input';
    });
    return new BadRequestException(errorMessages);
  }
  return new BadRequestException(errors);
};
