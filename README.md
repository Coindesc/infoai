# INFOAI — The Autonomous Chronicle 📰

Jornal Digital e Newsletter 100% Autônomo com curadoria por IA, cobertura multitemática (Política, Economia, Mundo, Tecnologia & IA, Esportes, Ciência & Saúde, Cultura & Pop), suporte a 6 idiomas, design editorial minimalista ultra-clean e distribuição personalizada por E-mail e WhatsApp nos horários escolhidos pelos assinantes.

---

## 🌟 Principais Recursos

- **Editorial Multitemático (Padrão G1):** Cadernos dedicados de Política, Economia, Mundo, Tecnologia, Esportes, Ciência & Saúde e Cultura.
- **Multilíngue (i18n):** Tradução instantânea para 6 idiomas (Português, Inglês, Espanhol, Francês, Alemão e Chinês).
- **Design System Ultra-Clean:** Modo Claro (*Paper Clean*) e Modo Escuro (*Midnight Slate*), com tipografia de alta legibilidade (Newsreader/Merriweather + Inter).
- **Distribuição Personalizada:** Cada leitor escolhe seu canal (E-mail, WhatsApp ou Ambos), horário exato e trilhas de interesse.
- **Leitura WhatsApp (2 min):** Payload pré-formatado com negritos e tópicos escaneáveis para dispositivos móveis.
- **Monetização Não-Invasiva:** Espaços para anúncios nativos e faixas de patrocínio integradas com elegância estética.
- **Pronto para VPS Hostinger:** Otimizado com Dockerfile multi-stage (~80MB RAM), Nginx e Docker Compose.

---

## 🚀 Como Rodar Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Gerar build de produção:**
   ```bash
   npm run build
   ```

3. **Iniciar o servidor completo:**
   ```bash
   node server/index.js
   ```
   Acesse no navegador: `http://localhost:3000`

---

## ☁️ Deploy na VPS Hostinger

1. Na sua VPS (Ubuntu 24.04 LTS), instale o Docker:
   ```bash
   curl -fsSL https://get.docker.com | sh
   ```
2. Clone o repositório na VPS:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git /var/www/infoai
   cd /var/www/infoai
   ```
3. Copie as variáveis de ambiente e suba o container:
   ```bash
   cp .env.example .env
   docker compose -f deploy/docker-compose.yml up -d --build
   ```
4. Veja o guia detalhado em [`deploy/hostinger_setup.md`](deploy/hostinger_setup.md).
