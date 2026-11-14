-- ==============================================================================
-- SCHEMA SUPABASE: INFOAI DIGITAL NEWSPAPER
-- Execute este script no SQL Editor do seu projeto Supabase.
-- ==============================================================================

-- 1. Tabela de Assinantes (Subscribers)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp', 'both')),
    email TEXT,
    phone TEXT,
    dispatch_time TIME NOT NULL DEFAULT '07:30',
    interests TEXT[] DEFAULT ARRAY['Hype & IA'],
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de alta performance para a verificação do agendador (cron job)
CREATE INDEX IF NOT EXISTS idx_subscribers_dispatch ON public.subscribers (dispatch_time, is_active);
CREATE INDEX IF NOT EXISTS idx_subscribers_channel ON public.subscribers (channel);

-- 2. Tabela de Edições Publicadas (Editions)
CREATE TABLE IF NOT EXISTS public.editions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_number INTEGER NOT NULL UNIQUE,
    published_date DATE NOT NULL,
    lead_title JSONB NOT NULL,
    lead_why_it_matters JSONB NOT NULL,
    lead_content JSONB NOT NULL,
    secondary_articles JSONB NOT NULL,
    cover_image_url TEXT,
    cover_prompt TEXT,
    whatsapp_payload TEXT NOT NULL,
    system_status TEXT NOT NULL DEFAULT '100% Operacional - Sem pendências',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Logs de Disparo (Dispatch Logs)
CREATE TABLE IF NOT EXISTS public.dispatch_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id UUID REFERENCES public.editions(id) ON DELETE CASCADE,
    subscriber_id UUID REFERENCES public.subscribers(id) ON DELETE CASCADE,
    channel TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('queued', 'sent', 'failed')),
    error_message TEXT,
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configuração de Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispatch_logs ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir inserção pública de novos cadastros de assinantes pelo portal
CREATE POLICY "Allow public insert to subscribers"
ON public.subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política 2: Permitir leitura pública das edições publicadas
CREATE POLICY "Allow public read of editions"
ON public.editions
FOR SELECT
TO anon, authenticated
USING (true);

-- Política 3: Apenas a chave de serviço (service_role) pode ler e atualizar assinantes e logs de envio
CREATE POLICY "Allow service role full access to subscribers"
ON public.subscribers
FOR ALL
TO service_role
USING (true);

CREATE POLICY "Allow service role full access to dispatch_logs"
ON public.dispatch_logs
FOR ALL
TO service_role
USING (true);

