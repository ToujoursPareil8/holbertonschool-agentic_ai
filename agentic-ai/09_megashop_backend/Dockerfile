FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node src ./src
COPY --chown=node:node specifications.md ./specifications.md

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]