# Base environment
FROM node:18-alpine
WORKDIR /app

# Install dependencies exclusively to keep container lean
COPY package*.json ./
RUN npm install --omit=dev

# Mount source code
COPY . .

# Expose WebSockets and HTTP routes
EXPOSE 5000

# Start background cron and express engine
CMD ["node", "server.js"]
