FROM node:20.11.1-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV TASKS_FILE_PATH=/app/tasks.json

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup app.js ./app.js

USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "const fs=require('fs'); const p=process.env.TASKS_FILE_PATH || '/app/tasks.json'; try { fs.accessSync(p, fs.constants.R_OK); process.exit(0); } catch { process.exit(1); }"

ENTRYPOINT ["node", "app.js"]
