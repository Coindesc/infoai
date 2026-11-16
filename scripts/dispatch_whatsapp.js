import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as whatsapp from '../server/services/whatsapp.js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Supabase não configurado no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DEFAULT_EDITION_PAYLOAD = `🗞️ *INFOAI DIGITAL | PANORAMA GERAL DO DIA*
_O resumo executivo de todas as editorias, sem ruído._

🏛️ *POLÍTICA | O Brasil na cadeia de chips*
O governo brasileiro avança nas negociações internacionais na Ásia para posicionar o país como fornecedor-chave de terras raras e minerais críticos para a indústria global de semicondutores.

📈 *ECONOMIA | Mercado e contas públicas*
O Ministério da Fazenda e o Congresso aceleram a votação do pacote de corte de gastos. O mercado reage com foco na curva de juros futuros e no comportamento do câmbio.

🌍 *MUNDO | Geopolítica e pressões diplomáticas*
Negociações entre Washington e Kiev sobre alternativas de segurança reacendem debates sobre a entrada da Ucrânia na Otan e o futuro das fronteiras no leste europeu.

💻 *TECNOLOGIA | IA ganha carteira e compra para você*
A OpenAI estreou o *ChatGPT Wallet* em parceria com Visa e Mastercard. Agentes inteligentes agora executam compras e checkouts com tokens dinâmicos e validação biométrica (*Face ID*).

⚽ *ESPORTES | Bastidores e reta final*
Clubes brasileiros ajustam o planejamento para a reta decisiva do Brasileirão e Libertadores, enquanto a Fifa define detalhes da tabela do Super Mundial de Clubes.

🔬 *CIÊNCIA & SAÚDE | Fusão nuclear e novas terapias*
Reatores de fusão estelar recebem aporte de centenas de milhões de euros para sustentar data centers, com a própria IA resolvendo os enigmas de controle do plasma magnético.

---
🌐 *Leia a edição completa e interativa:*
https://venderapido.com.br

🎯 _Edição personalizada enviada no seu horário. Responda PARAR para pausar os envios._`;

async function runDispatch() {
  console.log('🚀 Iniciando rotina de disparo WhatsApp...');

  // 1. Verificar estado da Evolution API
  const connState = await whatsapp.getConnectionState();
  console.log('📡 Status da instância Evolution API:', JSON.stringify(connState));

  // 2. Buscar assinantes ativos
  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('is_active', true)
    .in('channel', ['whatsapp', 'both']);

  if (error) {
    console.error('❌ Erro ao buscar assinantes:', error.message);
    return;
  }

  console.log(`📋 ${subscribers.length} assinante(s) ativo(s) encontrado(s) para WhatsApp.`);

  for (const sub of subscribers) {
    if (!sub.phone) {
      console.log(`⚠️ Assinante ${sub.full_name} não possui telefone cadastrado. Ignorando.`);
      continue;
    }

    console.log(`📤 Enviando briefing para ${sub.full_name} (${sub.phone})...`);
    const sendResult = await whatsapp.sendTextMessage(sub.phone, DEFAULT_EDITION_PAYLOAD);

    if (sendResult.success) {
      console.log(`✅ Sucesso no envio para ${sub.phone}`);
    } else {
      console.error(`❌ Falha no envio para ${sub.phone}:`, sendResult.error || sendResult.data);
    }

    // Gravar log no Supabase
    await supabase.from('dispatch_logs').insert([
      {
        channel: 'whatsapp',
        status: sendResult.success ? 'success' : 'failed',
        recipient_count: 1,
        payload_preview: DEFAULT_EDITION_PAYLOAD.slice(0, 100),
        error_message: sendResult.success ? null : JSON.stringify(sendResult.error || sendResult.data)
      }
    ]);
  }

  console.log('🏁 Rotina de disparo concluída.');
}

runDispatch().catch(console.error);

