import { Controller, Get, Injectable, Logger } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { Public } from '../auth/decorators/public.decorator';

@Injectable()
@Controller('health-check')
export class HealthCheckController {
  private readonly logger = new Logger(HealthCheckController.name);

  @Get()
  @Public()
  @HealthCheck()
  healthCheck() {
    return {
      uptime: process.uptime(),
      date: new Date(),
    };
  }
}
