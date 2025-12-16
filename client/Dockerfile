FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Debug: print env vars during build
RUN echo "=== DEBUG ENV ===" && \
    echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && \
    cat .env.production 2>/dev/null || echo "No .env.production" && \
    echo "================="

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
