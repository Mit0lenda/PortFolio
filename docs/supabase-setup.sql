-- ─────────────────────────────────────────────────────────────────────────────
-- mitolenda.dev — Supabase setup (dedicated portfolio project)
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Portfolio schema (isolated namespace)
CREATE SCHEMA IF NOT EXISTS portfolio;

-- Contact form leads
CREATE TABLE portfolio.leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  name        text NOT NULL,
  email       text NOT NULL,
  message     text NOT NULL,
  source      text NOT NULL DEFAULT 'contact-form',
  status      text NOT NULL DEFAULT 'new'
                CHECK (status IN ('new', 'viewed', 'replied', 'archived')),
  ip_hash     text,
  user_agent  text
);

-- Indexes for dashboard queries
CREATE INDEX idx_portfolio_leads_created_at ON portfolio.leads (created_at DESC);
CREATE INDEX idx_portfolio_leads_status     ON portfolio.leads (status);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row-Level Security
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE portfolio.leads ENABLE ROW LEVEL SECURITY;

-- anon / authenticated: INSERT only (contact form submissions)
CREATE POLICY "leads_insert" ON portfolio.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- service_role: full access (n8n reads via service key)
CREATE POLICY "leads_service_full" ON portfolio.leads
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

COMMENT ON TABLE portfolio.leads IS
  'Contact form submissions from mitolenda.dev';
