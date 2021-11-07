FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src src

RUN npm run build

CMD ["node", "/app/dist/app.js",  "Sun", "Wed"]
