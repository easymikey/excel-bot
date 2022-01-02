FROM node:14-alpine

WORKDIR /bot

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src src

RUN npm run build

CMD ["node", "/bot/dist/app.js", "Sun", "Wed"]