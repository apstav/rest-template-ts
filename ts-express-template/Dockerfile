# Use Node.js 22 base image
FROM node:23-alpine

# Create app directory
WORKDIR /usr/src

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]