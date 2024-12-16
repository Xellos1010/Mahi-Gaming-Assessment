#!/bin/bash

# Wait for the backend to be ready (we wait for port 3000 to be accessible)
echo "Waiting for backend to be ready..."
until curl -s http://localhost:3000/api; do
  echo "Backend not ready yet. Retrying in 2 seconds..."
  sleep 2
done

# Once the backend is ready, run the add-books.sh script
echo "Backend is ready. Adding books..."
/app/scripts/add-books.sh

# Now start the backend server
echo "Starting the backend server..."
exec node dist/apps/react-mahi-book-store-backend/main.js
