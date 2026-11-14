# Guia Completo de Deploy na VPS Hostinger — INFOAI Digital Newspaper

Este guia orienta a instalação e execução do portal do jornal digital **INFOAI** na sua VPS da Hostinger com máxima estabilidade, baixo consumo de memória RAM (~80MB) e certificado SSL grátis.

---

## 1. Conexão SSH à VPS Hostinger

Abra o terminal do seu computador (PowerShell no Windows ou Terminal no Linux/macOS) e conecte-se à sua VPS:

```bash
ssh root@SEU_IP_DA_HOSTINGER
```
*(Substitua `SEU_IP_DA_HOSTINGER` pelo endereço IP fornecido no painel da Hostinger).*

---

## 2. Instalação do Docker e Docker Compose na VPS (Método Recomendado)

Atualize os pacotes do Ubuntu/Debian da VPS e instale o Docker:

```bash
# Atualizar repositórios
apt update && apt upgrade -y

# Instalar Docker e Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verificar a instalação
docker --version
docker compose version
```

---

## 3. Clonar ou Transferir o Projeto para a VPS

Você pode clonar via Git ou transferir os arquivos para a pasta `/var/www/infoai`:

```bash
mkdir -p /var/www/infoai
cd /var/www/infoai

# Se estiver usando Git:
git clone https://github.com/seu-usuario/seu-repositorio.git .
```

---

## 4. Configurar as Variáveis de Ambiente (.env)

Crie o arquivo `.env` de produção a partir do `.env.example`:

```bash
cp .env.example .env
nano .env
```

Preencha as chaves:
- `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (obtidos no painel do Supabase)
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- `EVOLUTION_API_URL` e `EVOLUTION_API_KEY` (se sua Evolution API estiver rodando na mesma VPS ou em outra)

Salve com `Ctrl + O`, pressione `Enter`, e saia com `Ctrl + X`.

---

## 5. Subir a Aplicação com Docker Compose

Dentro da pasta `/var/www/infoai`, execute:

```bash
docker compose -f deploy/docker-compose.yml up -d --build
```

O Docker criará a imagem otimizada em dois estágios e inicializará o container na porta `3000`.

Para verificar se está tudo funcionando perfeitamente:
```bash
docker ps
curl http://localhost:3000/api/health
```
*(Você verá a resposta `status: online`, confirmando que o sistema está operacional).*

---

## 6. Configurar o Domínio e Nginx com SSL Grátis (HTTPS)

Para disponibilizar o jornal na porta 80/443 com seu domínio próprio (ex: `infoai.com.br`):

### A. Aponte o Domínio no DNS
No painel onde você comprou o domínio (Hostinger, Registro.br, Cloudflare, etc.):
- Crie um registro tipo **A**:
  - **Nome:** `@`
  - **Destino / IP:** O IP da sua VPS Hostinger
- Crie outro registro tipo **A**:
  - **Nome:** `www`
  - **Destino / IP:** O IP da sua VPS Hostinger

### B. Instalar e Configurar o Nginx na VPS
```bash
apt install nginx certbot python3-certbot-nginx -y
```

Copie a configuração pronta do projeto:
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/infoai
```

Edite o arquivo para colocar o seu domínio real:
```bash
nano /etc/nginx/sites-available/infoai
```
*(Altere `seudominio.com` e `www.seudominio.com` para o seu domínio real).*

Ative o site e reinicie o Nginx:
```bash
ln -s /etc/nginx/sites-available/infoai /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### C. Emitir Certificado SSL Grátis (Let's Encrypt)
Execute o Certbot para ativar HTTPS seguro automaticamente:

```bash
certbot --nginx -d seudominio.com -d www.seudominio.com
```

O Certbot configurará a renovação automática de 90 em 90 dias.

---

## 7. Como Atualizar para Novas Edições Diárias

Quando o motor autônomo compilar novas edições ou houver alterações no código, basta atualizar com:

```bash
cd /var/www/infoai
git pull
docker compose -f deploy/docker-compose.yml up -d --build
```
Sem downtime e sem interrupção de serviço.

