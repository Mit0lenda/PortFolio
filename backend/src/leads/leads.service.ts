import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateLeadDto } from './leads.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly supabase: SupabaseClient;
  private readonly webhookUrl: string | undefined;

  constructor(private readonly config: ConfigService) {
    const url = this.config.getOrThrow<string>('SUPABASE_URL');
    const key = this.config.getOrThrow<string>('SUPABASE_SERVICE_KEY');
    this.supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
    this.webhookUrl = this.config.get<string>('N8N_CONTACT_WEBHOOK_URL');
  }

  async create(dto: CreateLeadDto): Promise<{ success: true }> {
    const lead = {
      name:       dto.name,
      email:      dto.email,
      message:    dto.message,
      service:    dto.service ?? null,
      created_at: new Date().toISOString(),
    };

    // ── BE-05: persist to Supabase (schema: portfolio, table: leads) ──────────
    const { error } = await this.supabase
      .schema('portfolio')
      .from('leads')
      .insert(lead);

    if (error) {
      this.logger.error(`Supabase insert failed: ${error.message}`);
      throw new InternalServerErrorException('Failed to save lead');
    }

    this.logger.log(`Lead saved: ${dto.email}`);

    // ── Fire n8n webhook — non-blocking, best-effort ───────────────────────────
    if (this.webhookUrl) {
      fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch((err: Error) =>
        this.logger.warn(`n8n webhook error: ${err.message}`),
      );
    }

    return { success: true };
  }
}
