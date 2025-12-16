FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Debug: verify .env.production is present
RUN echo "=== .env.production ===" && cat .env.production && echo "======================="

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
