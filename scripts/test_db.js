import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;

async function testDatabase() {
  console.log('=======================================================');
  console.log('🔍 INICIANDO DIAGNÓSTICO COMPLETO DO BANCO DE DADOS');
  console.log('=======================================================');
  console.log(`📡 URL do Supabase: ${SUPABASE_URL}`);
  console.log(`🔑 Service Role Key presente: ${!!process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Sim' : 'Não'}`);
  console.log(`🔐 Senha do Banco presente: ${!!DB_PASSWORD ? 'Sim' : 'Não'}`);
  console.log('-------------------------------------------------------');

  let restSuccess = false;
  let directPgSuccess = false;

  // 1. TESTE VIA SUPABASE REST CLIENT (@supabase/supabase-js)
  console.log('\n[TESTE 1] Conexão via Supabase REST API & Service Role:');
  const startRest = Date.now();
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Consulta na tabela subscribers
    const { data: subs, error: subsError } = await supabase
      .from('subscribers')
      .select('*');

    if (subsError) {
      console.error('❌ Falha ao consultar subscribers via REST:', subsError.message);
    } else {
      const restDuration = Date.now() - startRest;
      console.log(`✅ Sucesso! Conectado em ${restDuration}ms.`);
      console.log(`👥 Assinantes cadastrados encontrados: ${subs.length}`);
      subs.forEach((s, idx) => {
        console.log(`   ${idx + 1}. ${s.full_name} | Canal: ${s.channel} | Tel: ${s.phone || 'N/A'} | Email: ${s.email || 'N/A'} | Status: ${s.is_active ? 'Ativo' : 'Inativo'}`);
      });
      restSuccess = true;
    }

    // Consulta na tabela editions
    const { data: eds, error: edsError } = await supabase.from('editions').select('*');
    if (edsError) {
      console.error('❌ Falha ao consultar editions:', edsError.message);
    } else {
      console.log(`📰 Edições cadastradas: ${eds.length}`);
    }

    // Consulta na tabela dispatch_logs
    const { data: logs, error: logsError } = await supabase.from('dispatch_logs').select('*');
    if (logsError) {
      console.error('❌ Falha ao consultar dispatch_logs:', logsError.message);
    } else {
      console.log(`📋 Logs de disparo registrados: ${logs.length}`);
    }

    // Teste de Escrita e Deleção (Integridade CRUD)
    console.log('\n[TESTE 2] Teste de Escrita e Deleção (CRUD Completo):');
    const testProbe = {
      full_name: 'Diagnostic Healthcheck Probe',
      channel: 'both',
      email: 'probe@test.local',
      phone: '+5511999999999',
      dispatch_time: '12:00:00',
      interests: ['tecnologia', 'politica'],
      is_active: false
    };

    const { data: inserted, error: insertError } = await supabase
      .from('subscribers')
      .insert([testProbe])
      .select();

    if (insertError) {
      console.error('❌ Falha na escrita de teste:', insertError.message);
    } else {
      const insertedId = inserted[0]?.id;
      console.log(`✅ Registro de teste inserido com ID: ${insertedId}`);

      // Deleção para limpar
      const { error: deleteError } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', insertedId);

      if (deleteError) {
        console.error('⚠️ Falha ao remover registro de teste:', deleteError.message);
      } else {
        console.log('✅ Registro de teste removido com sucesso. Banco 100% limpo.');
      }
    }
  } catch (err) {
    console.error('❌ Erro no teste REST:', err.message);
  }

  // 2. TESTE VIA CONEXÃO DIRETA POSTGRESQL (Porta 5432)
  console.log('\n[TESTE 3] Conexão Direta PostgreSQL (Host db.pmrgzdvnqwwtqlvkwmef.supabase.co:5432):');
  const projectRef = 'pmrgzdvnqwwtqlvkwmef';
  const directHost = `db.${projectRef}.supabase.co`;

  const pgClient = new Client({
    host: directHost,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000
  });

  const startPg = Date.now();
  try {
    await pgClient.connect();
    const pgDuration = Date.now() - startPg;
    console.log(`✅ Conexão Direta PostgreSQL estabelecida em ${pgDuration}ms!`);

    const res = await pgClient.query(`
      SELECT 
        table_name, 
        (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('📊 Tabelas públicas verificadas no PostgreSQL:');
    res.rows.forEach(r => {
      console.log(`   - Tabela '${r.table_name}' (${r.column_count} colunas)`);
    });

    directPgSuccess = true;
    await pgClient.end();
  } catch (pgErr) {
    console.error('❌ Erro na conexão direta PostgreSQL:', pgErr.message);
    try { await pgClient.end(); } catch (_) {}
  }

  console.log('\n=======================================================');
  console.log('🏁 RESULTADO DO DIAGNÓSTICO:');
  console.log(`- Supabase REST & Service Role API: ${restSuccess ? '🟢 100% OPERACIONAL' : '🔴 FALHA'}`);
  console.log(`- PostgreSQL Porta 5432 Direto:     ${directPgSuccess ? '🟢 100% OPERACIONAL' : '🔴 FALHA'}`);
  console.log('=======================================================');
}

testDatabase().catch(console.error);
