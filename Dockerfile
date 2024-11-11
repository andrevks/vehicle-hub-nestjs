# Base image for Node.js
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files
COPY . .

# Run Prisma client generation to ensure Prisma is set up
RUN npx prisma generate

# Expose application port
EXPOSE 3333

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
