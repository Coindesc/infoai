# ==============================================================================
# DOCKERFILE MULTI-STAGE: INFOAI DIGITAL NEWSPAPER (OTIMIZADO PARA VPS HOSTINGER)
# ==============================================================================

# Estágio 1: Build do Frontend (Vite + React + Tailwind)
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2: Imagem Final de Produção (Extremamente Leve ~80MB)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

# Copia os arquivos compilados do frontend e o servidor Express
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/public ./public

EXPOSE 3000

USER node

CMD ["node", "server/index.js"]

