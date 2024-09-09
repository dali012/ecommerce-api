import { IS_PUBLIC } from '@constants/index';
import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata(IS_PUBLIC, true);
