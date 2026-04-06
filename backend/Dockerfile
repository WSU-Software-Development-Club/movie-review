FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY config.js ./
COPY index.js ./
COPY database ./database/
COPY auth ./auth/
COPY util ./util/
COPY routes ./routes/
COPY services ./services/

EXPOSE 3001

CMD ["node", "index.js"]
