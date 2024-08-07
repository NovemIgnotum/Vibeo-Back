FROM node:20

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["node", "dist/server.js"]
