import { Injectable } from '@nestjs/common';
import { HEALTH_STATUS, type HealthResponse } from '@innogram/shared';

@Injectable()
export class AppService {
  getStatus(): HealthResponse {
    return { status: HEALTH_STATUS.OK };
  }
}
