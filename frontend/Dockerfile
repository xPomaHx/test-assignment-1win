FROM mhart/alpine-node:11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
