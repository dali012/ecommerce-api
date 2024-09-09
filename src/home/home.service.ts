import { AllConfigType } from '@config/config.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HomeService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  appInfo() {
    return {
      name: 'Ecommerce API',
      version: '1.0.0',
      prefix: this.configService.get('app.apiPrefix', { infer: true }),
      description:
        'Ecommerce API Project! This API is built using NestJS, Supabase (for database and storage), and Prisma, offering a powerful backend solution for managing Ecommerce services. It utilizes GraphQL for flexible and efficient data querying and manipulation.',
      author: 'Dali012',
      environment:
        this.configService.get('app.nodeEnv', { infer: true }) || 'development',
    };
  }
}
