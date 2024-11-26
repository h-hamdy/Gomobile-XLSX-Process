FROM node:23-alpine3.19

WORKDIR /frontend

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev-exposed"]