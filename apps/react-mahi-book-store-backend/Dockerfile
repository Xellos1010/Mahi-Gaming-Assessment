# Use Node.js base image
FROM docker.io/node:lts-alpine

# Environment configuration
ENV HOST=0.0.0.0
ENV PORT=3000

# Set working directory
WORKDIR /app

# Create a non-root user and group
RUN addgroup --system react-mahi-book-store-backend && \
    adduser --system -G react-mahi-book-store-backend react-mahi-book-store-backend

# Install OpenSSL
# Added this to DockerFile to avoid the warning: 
# backend-1     | prisma:warn Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-1.1.x".
# backend-1     | Please manually install OpenSSL and try installing Prisma again.
# backend-1     | prisma:warn Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-1.1.x".
# backend-1     | Please manually install OpenSSL and try installing Prisma again.
# backend-1     | Prisma schema loaded from prisma/schema.prisma

RUN apk add --no-cache openssl

# Copy package files and production files
COPY package.json package-lock.json ./
# Install production dependencies
RUN npm install --production

# Generate Prisma client
COPY libs/prisma/prisma prisma
RUN npx prisma generate --schema=prisma/schema.prisma

# Copy the dist app files
COPY dist/apps/react-mahi-book-store-backend dist/apps/react-mahi-book-store-backend

# Copy the data lib
COPY dist/libs/dtos/src dist/libs/dtos/src

# Adjust ownership of the directory
RUN chown -R react-mahi-book-store-backend:react-mahi-book-store-backend .

# Use a shell command to run database migrations and then start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db push && node dist/apps/react-mahi-book-store-backend/main.js"]