# Use an official Node runtime as a base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install application dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Expose port 4200
EXPOSE 4200


# CMD to run the modified "start" script
CMD ["npm", "start"]





