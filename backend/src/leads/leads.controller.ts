import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateLeadDto } from './leads.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /**
   * POST /leads
   * Stricter throttle: max 5 submissions per minute per IP
   * (overrides the global 60/10s guard)
   */
  @Throttle({ global: { ttl: 60_000, limit: 5 } })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }
}
