FROM node:20.19.4

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY ./src ./src

COPY .env .env

EXPOSE 8080

CMD ["npm","start"]