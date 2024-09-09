import { SkipAuth } from '@decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '@prisma/prisma.service';

@SkipAuth()
@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Check the health of the API and database services',
  })
  @ApiOkResponse({ description: 'Health check performed successfully' })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck('Ecommerce API Docs', 'http://localhost:1337/docs'),
      () =>
        this.db.pingCheck('Prisma Database', this.prisma, {
          timeout: 10000,
        }),
    ]);
  }
}
