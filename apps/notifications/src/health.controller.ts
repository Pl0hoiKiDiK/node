import { Controller, Get } from '@nestjs/common';
import { HEALTH_STATUS, type HealthResponse } from '@innogram/shared';

@Controller('health')
export class HealthController {
  @Get()
  getStatus(): HealthResponse {
    return { status: HEALTH_STATUS.OK };
  }
}
