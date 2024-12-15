import axios from 'axios';
import { exec } from 'child_process';

// Define the API endpoint
const API_URL = 'http://localhost:3000/api/books';

// Define an array of books
const BOOKS = [
  '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "description": "A story about the Jazz Age", "imageId": "http://example.com/image1.jpg"}',
  '{"title": "1984", "author": "George Orwell", "description": "A dystopian novel", "imageId": "http://example.com/image2.jpg"}',
  '{"title": "To Kill a Mockingbird", "author": "Harper Lee", "description": "A story of racial injustice", "imageId": "http://example.com/image3.jpg"}',
  '{"title": "Pride and Prejudice", "author": "Jane Austen", "description": "A romantic novel", "imageId": "http://example.com/image4.jpg"}',
  '{"title": "The Catcher in the Rye", "author": "J.D. Salinger", "description": "A story of adolescent rebellion", "imageId": "http://example.com/image5.jpg"}',
  '{"title": "Moby-Dick", "author": "Herman Melville", "description": "A whaling voyage", "imageId": "http://example.com/image6.jpg"}',
  '{"title": "War and Peace", "author": "Leo Tolstoy", "description": "A historical novel set during the Napoleonic wars", "imageId": "http://example.com/image7.jpg"}',
  '{"title": "The Odyssey", "author": "Homer", "description": "An epic Greek tale of Odysseus", "imageId": "http://example.com/image8.jpg"}',
  // Add all the remaining books here...
];

// Function to wait for the backend to be ready
async function waitForBackend() {
  console.log("Waiting for backend to be ready...");
  while (true) {
    try {
      await axios.get('http://localhost:3000/api');
      console.log("Backend is ready.");
      break;
    } catch (error) {
      console.log("Backend not ready yet. Retrying in 2 seconds...");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

// Function to add books to the backend
async function addBooks() {
  console.log("Adding books...");
  for (const book of BOOKS) {
    try {
      await axios.post(API_URL, JSON.parse(book), {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(`Added book: ${JSON.parse(book).title}`);
    } catch (error) {
      console.error(`Failed to add book: ${JSON.parse(book).title}`);
    }
  }
}

// Function to start the backend server
function startBackendServer() {
  console.log("Starting the backend server...");
  exec('node dist/apps/react-mahi-book-store-backend/main.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting backend server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Main function to execute the tasks
async function main() {
  await waitForBackend();
  await addBooks();
  startBackendServer();
}

main().catch(error => {
  console.error("Error in startup script:", error);
});
