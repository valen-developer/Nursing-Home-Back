FROM node:16

RUN mkdir /app

WORKDIR /app

COPY . . 

RUN npm install

RUN npm run build

CMD ["npm", "start"]