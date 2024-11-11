# Base image for Node.js
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

# Copy all application files
COPY . .

# Expose Angular development server port
EXPOSE 4200

# Start Angular CLI in development mode
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
