# Online Bookstore Application

## Project Overview

This is a full-stack Online Bookstore Application developed using Nx monorepo, featuring a NestJS backend and React frontend.

## 🗂️ Project Structure

```
react-monorepo/
│
├── apps/
│   ├── react-mahi-book-store/         # React Frontend
│   └── react-mahi-book-store-backend/ # NestJS Backend
│
├── libs/
│   ├── shared-decorators/              # Shared decorators
│   └── prisma/                         # Prisma ORM configuration
│
├── scripts/
│   └── startup.sh                      # Post-deployment script
│
├── docker-compose.yml
└── package.json
```

## 🚀 Features

- Nx Monorepo architecture
- NestJS Backend
- React Frontend
- Prisma ORM
- Docker containerization
- User authentication
- Book browsing and favorites management

## 📋 Prerequisites

- Node.js (v18+)
- npm (v9+)
- Docker Desktop
- Nx CLI

## 🛠️ Environment Setup

### Installation

```
# Clone the repository
git clone https://github.com/Xellos1010/Mahi-BookStore-Assessment

# Navigate to project directory
cd react-monorepo

# Install dependencies - (Don't need to perform this step as project was sent with node modules)
npm install

# Install Nx CLI globally
npm install -g nx
```

## 🔧 Docker & Deployment Commands

### Comprehensive Deployment

```
# Full deployment (generates Prisma, builds projects, starts containers, adds books to database)
npm run deploy
^--- If the daemon hasn't started wait and try again
The application will be built, online and books added to the database. 
navigate to http://localhost
http://localhost:3000/api is the backend health check
Sometimes after the add books to database script executes the front-end takes a minute to register the books have been added.
If you register before books are added to the database simple refresh the website 
If no books appear on first time pass thru because of quickly starting the application and registering then please refresh the environment.
------

# Start frontend, backend, and database - (after you build)
npm run docker:up

# Stop and remove containers
npm run docker:down

# Add books to production environment
npm run add-books-prod
```

### Manual Docker Commands

```
# Build specific services
nx run react-mahi-book-store:docker-compose-up-front-back-database

# Generate Prisma client
nx run prisma:generate

# Build specific applications
nx build react-mahi-book-store-backend
nx build react-mahi-book-store
```

## 🧪 Testing

```
# Run all tests
nx run-many -t test

# Test specific application
nx test react-mahi-book-store-backend
nx test react-mahi-book-store
```

## 🔒 Environment Variables

Create a `.env` file in the project root with:

```
DATABASE_URL=postgresql://username:password@localhost:5432/bookstore
```

## 📦 Key Dependencies

- Backend: NestJS, Prisma, TypeScript
- Frontend: React, Tanstack Query
- Authentication: JWT, Bcrypt
- Validation: Zod, Class Validator

## 🚧 Development Workflow

1. Generate Prisma Client
```
nx run prisma:generate
```

2. Start Development Servers
```
nx run react-mahi-book-store-backend:serve
nx run react-mahi-book-store:serve
```

## 📝 Deployment Considerations

- Ensure all environment variables are correctly configured
- Run database migrations before deployment
- Use the provided `deploy` script for complete setup

## 🔍 Troubleshooting

- Prisma Generate: If you encounter issues, manually run `npx prisma generate`
- Docker: Ensure Docker Desktop is running
- Dependencies: Run `npm install` if any package issues occur

## 👥 Contact

```
Evan McCall
e.mccallvr@gmail.com
786-357-6923
```

## 🌟 Additional Notes

```
- Supports Nx Monorepo best practices
- Modular architecture
- Scalable design
```