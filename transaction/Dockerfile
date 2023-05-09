FROM node:18.12.1-alpine3.17
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run prisma:generate
CMD ["npm", "start"]