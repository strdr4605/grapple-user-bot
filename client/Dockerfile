FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Force cache invalidation
RUN echo "Build timestamp: $(date)"

# Only set ENV if ARG is provided (don't override .env.production with empty value)
ARG NEXT_PUBLIC_API_URL
RUN if [ -n "$NEXT_PUBLIC_API_URL" ]; then echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production; fi

# Debug: print env vars during build
RUN echo "=== DEBUG ENV ===" && \
    echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && \
    cat .env.production 2>/dev/null || echo "No .env.production" && \
    echo "================="

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
