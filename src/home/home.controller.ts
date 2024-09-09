import { SkipAuth } from '@decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeService } from './home.service';

@SkipAuth()
@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @ApiOperation({ summary: 'Get application information' })
  @ApiOkResponse({
    description: 'Returns application information',
    schema: {
      example: {
        name: 'My Application',
        version: '1.0.0',
        description:
          'This is a sample application providing info at the base URL.',
        author: 'Your Name',
        environment: process.env.NODE_ENV || 'development',
      },
    },
  })
  getInfo() {
    return this.service.appInfo();
  }
}
