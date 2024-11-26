FROM node:23-alpine3.19

WORKDIR /backend

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]