import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;
const client = new Client({
  connectionString: `postgresql://postgres:${encodeURIComponent(process.env.SUPABASE_DB_PASSWORD)}@db.pmrgzdvnqwwtqlvkwmef.supabase.co:5432/postgres`,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  await client.query(`DROP POLICY IF EXISTS "Allow service role full access to editions" ON public.editions;`);
  await client.query(`CREATE POLICY "Allow service role full access to editions" ON public.editions FOR ALL TO service_role USING (true);`);
  console.log('✅ Policy adicionada com sucesso!');
  await client.end();
}

main().catch(console.error);
