FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3001

RUN yarn build

CMD ["yarn", "start:dev"]