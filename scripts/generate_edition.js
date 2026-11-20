import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDailyEdition } from '../server/services/editorial_ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

async function run() {
  console.log('=======================================================');
  console.log('🤖 INICIANDO REDAÇÃO AUTÔNOMA DO JORNAL COM GEMINI FLASH');
  console.log('=======================================================');

  const startTime = Date.now();
  const edition = await generateDailyEdition();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`✅ Edição gerada com sucesso pela IA em ${duration}s!`);
  console.log(`📰 Manchete Principal: "${edition.leadArticle.title.pt}"`);
  console.log(`📊 Total de matérias curadas: ${1 + edition.articles.length}`);
  console.log(`📱 WhatsApp Payload gerado (${edition.whatsAppPayload.length} caracteres).`);

  // 1. Salvar no Supabase
  if (supabase) {
    console.log('\n💾 Gravando edição no Supabase...');
    const { data, error } = await supabase.from('editions').insert([
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
        system_status: edition.systemStatus || '100% Operacional - Autônomo Gemini Flash'
      }
    ]).select();

    if (error) {
      console.error('⚠️ Aviso ao salvar no Supabase:', error.message);
    } else {
      console.log(`✅ Edição registrada no Supabase com ID: ${data[0]?.id}`);
    }
  }

  // 2. Salvar arquivo JSON local para persistência
  const edicoesDir = path.join(__dirname, '..', 'edicoes');
  if (!fs.existsSync(edicoesDir)) fs.mkdirSync(edicoesDir, { recursive: true });
  
  const filePath = path.join(edicoesDir, 'ultima_edicao.json');
  fs.writeFileSync(filePath, JSON.stringify(edition, null, 2), 'utf-8');
  console.log(`💾 Cópia local salva em: ${filePath}`);

  console.log('=======================================================');
  console.log('🎉 CICLO EDITORIAL COMPLETO CONCLUÍDO!');
  console.log('=======================================================');
}

run().catch(console.error);
