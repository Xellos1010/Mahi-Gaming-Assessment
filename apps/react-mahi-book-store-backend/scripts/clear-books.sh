#!/bin/bash

# Define the API endpoint
API_URL="http://localhost:3000/api/books"

# Clear all books from the database
echo "Clearing all books from the database..."
curl -X DELETE "$API_URL"
