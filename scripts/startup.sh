#!/bin/bash

# Wait for the backend to be ready (we wait for port 3000 to be accessible)
echo "Waiting for backend to be ready..."
until curl -s http://localhost/api; do
  echo "Backend not ready yet. Retrying in 2 seconds..."
  sleep 2
done

# Once the backend is ready, run the add-books.sh script
echo "Backend is ready. Adding books..."
scripts/add-books.sh