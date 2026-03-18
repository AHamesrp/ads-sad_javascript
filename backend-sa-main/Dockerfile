# Usar Node.js 18 Alpine (versão leve)
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Criar diretórios necessários
RUN mkdir -p uploads/avatars logs

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]