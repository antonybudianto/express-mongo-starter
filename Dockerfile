FROM node

WORKDIR /usr/data/express-mongo-starter

COPY . .

CMD ["npm", "start"]
