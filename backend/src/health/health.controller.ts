import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() // health checks should never be throttled
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  // GET /health
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Heap must stay under 512 MB
      () => this.memory.checkHeap('memory_heap', 512 * 1024 * 1024),
    ]);
  }
}
