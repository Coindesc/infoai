import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sqlFilePath = path.join(__dirname, '..', 'supabase', 'schema.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf8');

const password = process.env.SUPABASE_DB_PASSWORD;
const projectRef = 'pmrgzdvnqwwtqlvkwmef';

if (!password) {
  console.error('SUPABASE_DB_PASSWORD nao configurada no .env');
  process.exit(1);
}

const configs = [
  {
    name: 'Supabase Direct Host',
    connectionString: `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false }
  }
];

async function run() {
  for (const config of configs) {
    console.log(`Tentando conectar via: ${config.name}...`);
    const client = new Client(config);
    try {
      await client.connect();
      console.log(`Conectado com sucesso via ${config.name}!`);
      await client.query(sql);
      console.log('Tabelas criadas com sucesso!');
      await client.end();
      process.exit(0);
    } catch (err) {
      console.error(`Falha:`, err.message);
      try { await client.end(); } catch (e) {}
    }
  }
  process.exit(1);
}

run();
