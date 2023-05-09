FROM node:18.12.1-alpine3.17
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
RUN npm run prisma:generate
USER node
COPY --chown=node:node . .
CMD ["npm", "run", "start:wallet"]