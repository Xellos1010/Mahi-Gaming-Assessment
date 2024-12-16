const axios = require('axios');
const { exec } = require('child_process');

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
  '{"title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "description": "A philosophical novel about guilt", "imageId": "http://example.com/image9.jpg"}',
  '{"title": "Brave New World", "author": "Aldous Huxley", "description": "A dystopian vision of the future", "imageId": "http://example.com/image10.jpg"}',
  '{"title": "Anna Karenina", "author": "Leo Tolstoy", "description": "A tragic love story", "imageId": "http://example.com/image11.jpg"}',
  '{"title": "The Hobbit", "author": "J.R.R. Tolkien", "description": "A fantasy adventure", "imageId": "http://example.com/image12.jpg"}',
  '{"title": "Catch-22", "author": "Joseph Heller", "description": "A satire on the absurdity of war", "imageId": "http://example.com/image13.jpg"}',
  '{"title": "The Picture of Dorian Gray", "author": "Oscar Wilde", "description": "A novel about vanity and corruption", "imageId": "http://example.com/image14.jpg"}',
  '{"title": "The Brothers Karamazov", "author": "Fyodor Dostoevsky", "description": "A philosophical novel exploring faith and doubt", "imageId": "http://example.com/image15.jpg"}',
  '{"title": "The Divine Comedy", "author": "Dante Alighieri", "description": "A journey through Hell, Purgatory, and Heaven", "imageId": "http://example.com/image16.jpg"}',
  '{"title": "Frankenstein", "author": "Mary Shelley", "description": "A tale of ambition and creation", "imageId": "http://example.com/image17.jpg"}',
  '{"title": "Dracula", "author": "Bram Stoker", "description": "A gothic horror novel", "imageId": "http://example.com/image18.jpg"}',
  '{"title": "Fahrenheit 451", "author": "Ray Bradbury", "description": "A novel about censorship", "imageId": "http://example.com/image19.jpg"}',
  '{"title": "Slaughterhouse-Five", "author": "Kurt Vonnegut", "description": "A novel about war and time travel", "imageId": "http://example.com/image20.jpg"}',
  '{"title": "The Fault in Our Stars", "author": "John Green", "description": "A story about young love and cancer", "imageId": "http://example.com/image21.jpg"}',
  '{"title": "The Lord of the Rings", "author": "J.R.R. Tolkien", "description": "A high fantasy epic", "imageId": "http://example.com/image22.jpg"}',
  '{"title": "The Road", "author": "Cormac McCarthy", "description": "A post-apocalyptic novel", "imageId": "http://example.com/image23.jpg"}',
  '{"title": "The Shining", "author": "Stephen King", "description": "A psychological horror novel", "imageId": "http://example.com/image24.jpg"}',
  '{"title": "A Tale of Two Cities", "author": "Charles Dickens", "description": "A historical novel set during the French Revolution", "imageId": "http://example.com/image25.jpg"}',
  '{"title": "The Grapes of Wrath", "author": "John Steinbeck", "description": "A story of migrant workers", "imageId": "http://example.com/image26.jpg"}',
  '{"title": "The Outsiders", "author": "S.E. Hinton", "description": "A coming-of-age novel", "imageId": "http://example.com/image27.jpg"}',
  '{"title": "The Bell Jar", "author": "Sylvia Plath", "description": "A novel about mental illness", "imageId": "http://example.com/image28.jpg"}',
  '{"title": "The Secret Garden", "author": "Frances Hodgson Burnett", "description": "A novel about childhood and healing", "imageId": "http://example.com/image29.jpg"}',
  '{"title": "Little Women", "author": "Louisa May Alcott", "description": "A story of four sisters growing up", "imageId": "http://example.com/image30.jpg"}',
  '{"title": "The Chronicles of Narnia", "author": "C.S. Lewis", "description": "A fantasy series for children", "imageId": "http://example.com/image31.jpg"}',
  '{"title": "Wuthering Heights", "author": "Emily Brontë", "description": "A tale of passion and revenge", "imageId": "http://example.com/image32.jpg"}',
  '{"title": "Jane Eyre", "author": "Charlotte Brontë", "description": "A gothic romance", "imageId": "http://example.com/image33.jpg"}',
  '{"title": "The Iliad", "author": "Homer", "description": "An ancient Greek epic", "imageId": "http://example.com/image34.jpg"}',
  '{"title": "Heart of Darkness", "author": "Joseph Conrad", "description": "A journey into the Congo", "imageId": "http://example.com/image35.jpg"}',
  '{"title": "The Hobbit", "author": "J.R.R. Tolkien", "description": "A fantastical adventure", "imageId": "http://example.com/image36.jpg"}',
  '{"title": "The Handmaids Tale", "author": "Margaret Atwood", "description": "A dystopian novel about gender", "imageId": "http://example.com/image37.jpg"}',
  '{"title": "Lord of the Flies", "author": "William Golding", "description": "A novel about the collapse of society", "imageId": "http://example.com/image38.jpg"}',
  '{"title": "The Catcher in the Rye", "author": "J.D. Salinger", "description": "A story of alienation", "imageId": "http://example.com/image39.jpg"}',
  '{"title": "Don Quixote", "author": "Miguel de Cervantes", "description": "A novel about chivalry", "imageId": "http://example.com/image40.jpg"}',
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
