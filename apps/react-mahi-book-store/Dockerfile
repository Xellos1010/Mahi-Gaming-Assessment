# Step 1: Build the React app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY dist/apps/react-mahi-book-store dist/apps/react-mahi-book-store
# Step 2: Serve the static files using NGINX
FROM nginx:alpine

# Create a non-root user and group for security (if required)
RUN addgroup --system react-mahi-book-store-frontend && \
    adduser --system -G react-mahi-book-store-frontend react-mahi-book-store-frontend

# Copy the built app to NGINX's public directory
COPY --from=builder /app/dist/apps/react-mahi-book-store /usr/share/nginx/html

# Expose the port NGINX serves on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
