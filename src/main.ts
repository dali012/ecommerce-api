import { AllConfigType } from '@config/config.type';
import { ResolvePromisesInterceptor } from '@interceptors/serializer.interceptor';
import {
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import setupSwagger from '@utils/setup-swagger';
import validationOptions from '@utils/validation-options';
import { useContainer } from 'class-validator';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.use(helmet());
  app.use(compression());

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: [
        { method: RequestMethod.GET, path: '/' },
        { method: RequestMethod.GET, path: 'health' },
        { method: RequestMethod.GET, path: 'metrics' },
      ],
    },
  );

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  setupSwagger(app);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
