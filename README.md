# Grapple Legal Assistant

v1.0

**Live:** https://grapple-client-gv8m6.ondigitalocean.app

## What is this

AI chat assistant for legal cases. Pulls case data from Pipedrive CRM, uses OpenAI for responses with conversation memory.

## Dev

```bash
# Need .env in /server with OPENAI_API_KEY and PIPEDRIVE_KEY
docker compose up --build
```

Client: http://localhost:3000
Server: http://localhost:3002

## Deploy

Both apps on DigitalOcean App Platform using buildpacks (not Dockerfiles).

- Server env vars set in DO dashboard (secrets don't work via app.yaml)
- Client uses `.env.production` for API URL

## Struggles

Spent hours on DO env vars not reaching the container. Turns out:
1. `type: SECRET` in app.yaml creates empty encrypted placeholders
2. Component-level vars override app-level vars
3. Dockerfiles + secrets = pain. Buildpacks just work.

Lesson: skip Dockerfiles on DO App Platform when you need runtime secrets.
