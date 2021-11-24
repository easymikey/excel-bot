FROM node:14-alpine

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src src

RUN npm run build

COPY start-bot.sh /usr/local/bin/start-bot.sh

RUN chmod +x /usr/local/bin/start-bot.sh

RUN echo '00  19  *  *  *   /usr/local/bin/start-bot.sh' > /etc/crontabs/root

CMD ["crond", "-l", "2", "-f"]