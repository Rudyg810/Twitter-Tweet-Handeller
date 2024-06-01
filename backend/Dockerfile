# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Bundle app source
COPY . .


# Expose port 1267 to the outside world
EXPOSE 8080

# Command to run the application
CMD ["node", "server.js"]