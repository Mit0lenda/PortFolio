import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    // ── Config (isGlobal → all modules can inject ConfigService) ──────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ── BE-02: Rate limiting — 60 req per 10 s per IP (global default) ────────
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 10_000, // 10 seconds (in ms)
        limit: 60,
      },
    ]),

    // ── BE-04: In-memory cache — TTL 60 s ─────────────────────────────────────
    CacheModule.register({
      isGlobal: true,
      ttl: 60_000, // 60 seconds (in ms)
      max: 200,    // max cached items
    }),

    HealthModule,
    LeadsModule,
  ],

  providers: [
    // Apply ThrottlerGuard globally to all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
