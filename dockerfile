#imagem base
FROM node:18

#Diretório da aplicação
WORKDIR /app

#Copia a pasta do código fonte
COPY . .

#Executa o comando para baixar as dependências
RUN npm install

#Executar o comnando de build
RUN npm run build

CMD ["node", "dist/main.js"]
