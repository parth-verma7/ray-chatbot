# Use official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /docker_directory

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /docker_directory/

# Build the Next.js app
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]



