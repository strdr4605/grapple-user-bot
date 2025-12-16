FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Receive runtime env vars as build args and set as ENV for runtime
ARG OPENAI_API_KEY
ARG PIPEDRIVE_KEY
ARG PORT=3002

ENV OPENAI_API_KEY=$OPENAI_API_KEY
ENV PIPEDRIVE_KEY=$PIPEDRIVE_KEY
ENV PORT=$PORT

EXPOSE 3002

CMD ["npm", "start"]
