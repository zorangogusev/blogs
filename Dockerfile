FROM node:15.5.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["npm", "dev"]
