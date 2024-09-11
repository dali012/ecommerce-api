import appConfig from '@config/app.config';
import { ApiKeyGuard } from '@guards/apiKey.guard';
import { HealthModule } from '@health/health.module';
import { MetricsModule } from '@metrics/metrics.module';
import fileConfig from '@models/files/config/file.config';
import { FilesModule } from '@models/files/files.module';
import { ProductsModule } from '@models/products/products.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from '@prisma/prisma.module';
import {
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';
import { join } from 'path';
import { MetricsMiddleware } from './common/middlewares/metrics.middleware';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      fieldResolverEnhancers: ['guards'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ProductsModule,
    HealthModule,
    MetricsModule,
    HomeModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    makeCounterProvider({
      name: 'count',
      help: 'metric_help',
      labelNames: ['method', 'origin'] as string[],
    }),
    makeGaugeProvider({
      name: 'gauge',
      help: 'metric_help',
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
