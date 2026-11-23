import { Controller, Get } from '@nestjs/common';
import type { HealthResponse } from '@innogram/shared';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): HealthResponse {
    return this.appService.getStatus();
  }
}
