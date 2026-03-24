# Minimal image for Railway / Fly.io / any container host
FROM node:22-alpine
WORKDIR /app
COPY package.json server.mjs ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.mjs"]
