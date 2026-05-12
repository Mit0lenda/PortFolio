# Estágio 1: Build da aplicação Vite (React)
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências de forma limpa e otimizada
RUN npm ci

# Copia o restante do código da aplicação
COPY . .

# Realiza o build de produção
RUN npm run build

# Estágio 2: Servidor Web (Nginx) para produção
FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia a configuração customizada do Nginx para suportar a SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no build para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
