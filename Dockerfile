FROM node:16.10.0

WORKDIR app

COPY package-lock.json .
COPY package.json .
COPY dist dist
COPY .env .

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]