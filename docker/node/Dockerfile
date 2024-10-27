FROM node:18-alpine

WORKDIR /src

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]