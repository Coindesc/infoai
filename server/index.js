import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import * as whatsapp from './services/whatsapp.js';
import { generateDailyEdition } from './services/editorial_ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Supabase server client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Serve static frontend files from 'dist'
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// In-memory fallback if Supabase credentials are not yet set
const localSubscribers = [];

// 1. Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: '100% Autônomo - Sem Pendências',
    model: 'Gemini Flash Latest',
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabase
  });
});

// 1.1 Consultar última edição publicada
app.get('/api/edition/latest', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('editions')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        const row = data[0];
        const formatted = {
          id: row.id,
          editionNumber: row.edition_number,
          date: row.published_date,
          systemStatus: row.system_status || '100% Operacional - Autônomo Gemini Flash',
          coverPrompt: row.cover_prompt,
          whatsAppPayload: row.whatsapp_payload,
          leadArticle: {
            id: 'lead-' + row.edition_number,
            category: 'tecnologia',
            readTime: '3',
            imageUrl: row.cover_image_url || '/covers/cover_001.jpg',
            sourcesCrossedCount: 4,
            title: row.lead_title,
            whyItMatters: row.lead_why_it_matters,
            content: row.lead_content
          },
          articles: row.secondary_articles || []
        };
        return res.json({ success: true, edition: formatted });
      }
    }

    const localPath = path.join(__dirname, '..', 'edicoes', 'ultima_edicao.json');
    if (fs.existsSync(localPath)) {
      const fileData = JSON.parse(fs.readFileSync(localPath, 'utf8'));
      return res.json({ success: true, edition: fileData });
    }

    res.status(404).json({ error: 'Nenhuma edição encontrada.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1.2 Disparo da geração autônoma diária da IA
app.post('/api/edition/generate', async (req, res) => {
  try {
    console.log('[API] Gatilho de geração autônoma acionado...');
    const edition = await generateDailyEdition();

    if (supabase) {
      await supabase.from('editions').insert([
        {
          edition_number: edition.editionNumber,
          published_date: new Date().toISOString().split('T')[0],
          lead_title: edition.leadArticle.title,
          lead_why_it_matters: edition.leadArticle.whyItMatters,
          lead_content: edition.leadArticle.content,
          secondary_articles: edition.articles,
          cover_image_url: edition.leadArticle.imageUrl,
          cover_prompt: edition.coverPrompt,
          whatsapp_payload: edition.whatsAppPayload,
          system_status: '100% Operacional - Autônomo Gemini Flash'
        }
      ]);
    }

    const edicoesDir = path.join(__dirname, '..', 'edicoes');
    if (!fs.existsSync(edicoesDir)) fs.mkdirSync(edicoesDir, { recursive: true });
    fs.writeFileSync(path.join(edicoesDir, 'ultima_edicao.json'), JSON.stringify(edition, null, 2), 'utf8');

    res.json({ success: true, edition });
  } catch (err) {
    console.error('Erro na geração da edição:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Subscriber Registration Endpoint (Regra 1A de regras_criação)
app.post('/api/subscribe', async (req, res) => {
  try {
    const { fullName, channel, email, phone, dispatchTime, interests } = req.body;

    if (!fullName || !channel || !dispatchTime) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    if (supabase) {
      const { data, error } = await supabase.from('subscribers').insert([
        {
          full_name: fullName,
          channel: channel,
          email: email || null,
          phone: phone || null,
          dispatch_time: dispatchTime,
          interests: interests || [],
          is_active: true,
          created_at: new Date().toISOString()
        }
      ]).select();

      if (error) {
        console.error('Erro no Supabase:', error);
        return res.status(500).json({ error: 'Erro ao registrar no Supabase', details: error.message });
      }

      return res.status(201).json({ success: true, subscriber: data[0] });
    } else {
      const newSub = {
        id: 'sub_' + Date.now(),
        fullName,
        channel,
        email,
        phone,
        dispatchTime,
        interests: interests || [],
        createdAt: new Date().toISOString()
      };
      localSubscribers.push(newSub);
      console.log('Novo assinante local cadastrado:', newSub);
      return res.status(201).json({
        success: true,
        message: 'Assinante registrado localmente (configure o Supabase para sincronização em nuvem)',
        subscriber: newSub
      });
    }
  } catch (err) {
    console.error('Erro na rota /api/subscribe:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// 3. WhatsApp Integration Endpoints (Evolution API)
// 3.1 Status da conexão
app.get('/api/whatsapp/status', async (req, res) => {
  try {
    const state = await whatsapp.getConnectionState();
    res.json({ success: true, state });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3.2 Visualizar / Conectar QR Code em interface web amigável
app.get('/api/whatsapp/connect', async (req, res) => {
  try {
    // Tenta criar se não existir
    try {
      await whatsapp.createInstance();
    } catch (_) {}

    const connectData = await whatsapp.getConnectQRCode();
    const qrBase64 = connectData?.base64 || connectData?.qrcode?.base64;
    const pairingCode = connectData?.pairingCode || connectData?.qrcode?.pairingCode;

    if (qrBase64) {
      const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Conectar WhatsApp • InfoAI / VendeRápido</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0B0F17; color: #F8FAFC; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
            .card { background: #161E2E; border: 1px solid #1E293B; border-radius: 16px; padding: 32px; max-width: 420px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            h1 { font-size: 20px; margin-bottom: 8px; color: #3B82F6; }
            p { font-size: 14px; color: #94A3B8; margin-bottom: 24px; line-height: 1.5; }
            img { width: 260px; height: 260px; border-radius: 12px; background: white; padding: 8px; }
            .badge { display: inline-block; background: #16A34A; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
            .code { font-family: monospace; font-size: 18px; color: #22C55E; letter-spacing: 2px; margin-top: 12px; }
            .hint { font-size: 12px; color: #64748B; margin-top: 20px; }
          </style>
          <meta http-equiv="refresh" content="20">
        </head>
        <body>
          <div class="card">
            <span class="badge">WHATSAPP DISPATCH BOT</span>
            <h1>Escaneie o QR Code</h1>
            <p>Abra o WhatsApp no celular > <b>Aparelhos Conectados</b> > <b>Conectar Aparelho</b> e aponte a câmera para o código abaixo:</p>
            <img src="${qrBase64}" alt="QR Code WhatsApp" />
            ${pairingCode ? `<div class="code">Código: ${pairingCode}</div>` : ''}
            <div class="hint">Esta tela atualiza automaticamente a cada 20 segundos.</div>
          </div>
        </body>
        </html>
      `;
      return res.send(html);
    }

    res.json({
      success: true,
      message: 'Instância já pode estar conectada ou aguardando status.',
      data: connectData
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3.3 Disparo de teste
app.post('/api/whatsapp/send-test', async (req, res) => {
  try {
    const { phone, message } = req.body;
    let targetPhone = phone;

    if (!targetPhone && supabase) {
      const { data } = await supabase.from('subscribers').select('phone').eq('is_active', true).limit(1);
      if (data && data.length > 0) targetPhone = data[0].phone;
    }

    if (!targetPhone) {
      return res.status(400).json({ error: 'Nenhum telefone fornecido ou encontrado em assinantes.' });
    }

    const defaultPayload = message || `🗞️ *INFOAI DIGITAL | TESTE DE INTEGRAÇÃO*\n\nConexão com WhatsApp via Evolution API validada com sucesso!\n\n_100% Autônomo • venderapido.com.br_`;
    const result = await whatsapp.sendTextMessage(targetPhone, defaultPayload);

    // Registra log se Supabase estiver ativo
    if (supabase) {
      await supabase.from('dispatch_logs').insert([
        {
          channel: 'whatsapp',
          status: result.success ? 'sent' : 'failed',
          error_message: result.success ? null : JSON.stringify(result.error)
        }
      ]);
    }

    res.json({ success: result.success, recipient: targetPhone, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Webhook receiver for Evolution API (WhatsApp events)
app.post('/api/webhook/evolution', async (req, res) => {
  const event = req.body;
  console.log('[Evolution API Webhook Evento]:', JSON.stringify(event));

  // Opt-out handling ("PARAR" ou "CANCELAR")
  try {
    const msg = event?.data?.message?.conversation || event?.data?.message?.extendedTextMessage?.text;
    if (msg) {
      const text = msg.trim().toUpperCase();
      if (text === 'PARAR' || text === 'CANCELAR') {
        const remoteJid = event.data.key.remoteJid || '';
        const phone = remoteJid.replace('@s.whatsapp.net', '').replace(/\D/g, '');
        console.log(`[Solicitação de Cancelamento WhatsApp]: ${phone}`);

        if (supabase && phone) {
          await supabase
            .from('subscribers')
            .update({ is_active: false })
            .ilike('phone', `%${phone.slice(-8)}%`);
          console.log(`[Assinante desativado no Supabase]: ${phone}`);
        }
      }
    }
  } catch (e) {
    console.error('Erro ao processar webhook opt-out:', e.message);
  }

  res.status(200).json({ received: true });
});

// SPA catch-all route: forward all non-API requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`📰 INFOAI Digital Newspaper Server Ativo`);
  console.log(`🚀 Porta: http://localhost:${PORT}`);
  console.log(`🛡️ Status: 100% Autônomo - Pronto para VPS Hostinger`);
  console.log(`=======================================================`);
});

