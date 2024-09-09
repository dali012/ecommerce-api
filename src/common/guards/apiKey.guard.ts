import { AllConfigType } from '@config/config.type';
import { IS_PUBLIC } from '@constants/index';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const apiKey = req.headers ? req.headers['x-api-key'] : undefined;

    const validApiKey = this.configService.getOrThrow('app.apiKey', {
      infer: true,
    });

    if (apiKey === validApiKey || isPublic) {
      return true;
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
