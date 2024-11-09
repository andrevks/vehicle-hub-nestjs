FROM node:20-alpine


WORKDIR /app


COPY package*.json ./
RUN npm install

EXPOSE 3333

CMD [ "npm", "run", "start:dev" ]


