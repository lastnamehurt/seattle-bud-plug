# Use an official Node.js runtime as a parent image
FROM node:16.14.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app to the working directory
COPY . .

# Build the app
RUN npm run build

# Set the command to start the app
CMD ["npm", "start"]
