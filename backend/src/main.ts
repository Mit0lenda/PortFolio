import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });

  // ── BE-01: Compression (gzip/brotli) ───────────────────────────────────────
  app.use(compression());

  // ── Security headers ───────────────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: false, // managed at Cloudflare level
    }),
  );

  // ── CORS ───────────────────────────────────────────────────────────────────
  const allowedOrigins = (process.env.CORS_ORIGIN ?? 'https://mitolenda.dev')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  });

  // ── Validation ─────────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strip unknown props
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '4000', 10);
  await app.listen(port, '0.0.0.0');
  logger.log(`Portfolio API running on port ${port}`);
}

bootstrap();
