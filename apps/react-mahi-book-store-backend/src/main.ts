/**
 * @fileoverview
 * This file contains the bootstrap logic for setting up and running the NestJS application.
 * It initializes the application by configuring various settings such as:
 * - Enabling global prefixes for API routes (e.g., 'api')
 * - Configuring CORS (Cross-Origin Resource Sharing) to allow requests from a specific origin
 * - Starting the application on a given port (default: 3000)
 * 
 * The application is not intended for production use at this point, and this server setup serves as a minimal backend
 * to get started with the project.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const origin = process.env.ORIGIN; // The origin from which cross-origin requests are allowed (e.g., front-end app)

/**
 * @function bootstrap
 * 
 * @description
 * This function bootstraps the NestJS application by:
 * - Creating the application using `NestFactory.create()`
 * - Setting a global API prefix ('api') for all routes
 * - Configuring CORS settings to allow requests from a specified origin
 * - Starting the server on the configured port (default: 3000)
 * 
 * @returns {Promise<void>} - The function does not return any value but starts the application server.
 * 
 * @throws {Error} - Throws an error if the application fails to start or listen on the specified port.
 */
async function bootstrap(): Promise<void> {
  // Create the application with the AppModule configuration
  const app = await NestFactory.create(AppModule);
  
  // Set global API prefix to 'api'
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Get the port from the environment variables or use 3000 as default
  const port = process.env.PORT || 3000;

  // Enable CORS with specific configuration for development
  app.enableCors({
    origin: origin ? origin : 'http://localhost:4200', // Allow the front-end origin or fallback to localhost:4200
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow common HTTP methods
    credentials: true, // Allow credentials like cookies and authorization headers
  });

  // Start the server on the configured port
  await app.listen(port);
  
  // Log the application startup details
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

// Call the bootstrap function to start the application
bootstrap();
