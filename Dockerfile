# Dockerfile

# Use a Node.js 14.x runtime as base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Set environment variables
ENV NODE_ENV production

# Start the app
CMD ["npm", "start"]