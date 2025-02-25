# Use the official Node.js LTS image
FROM node:20.11.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5173

# Updated command to run with host flag
CMD ["npm", "run", "dev", "--", "--host"]