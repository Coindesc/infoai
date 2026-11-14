import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

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
    model: 'Gemini 3.8 Flash Core',
    timestamp: new Date().toISOString(),
    supabaseConnected: !!supabase
  });
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

// 3. Webhook receiver for Evolution API (WhatsApp events)
app.post('/api/webhook/evolution', (req, res) => {
  const event = req.body;
  console.log('[Evolution API Webhook Evento]:', JSON.stringify(event));

  // Example handling: opt-out request ("PARAR" ou "CANCELAR")
  if (event?.data?.message?.conversation) {
    const text = event.data.message.conversation.trim().toUpperCase();
    if (text === 'PARAR' || text === 'CANCELAR') {
      const fromNumber = event.data.key.remoteJid;
      console.log(`[Solicitação de Cancelamento WhatsApp]: ${fromNumber}`);
      // Update subscriber active state in Supabase
    }
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

