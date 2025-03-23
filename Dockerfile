# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /giftbox

# Copiando o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# Build
RUN npm run build

# Expondo a porta onde o servidor Node.js irá rodar (por padrão, vamos usar a 3002)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
