const { execSync } = require('child_process');
const axios = require('axios');

async function waitForBackend() {
  const maxRetries = 30;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log('Checking backend readiness...');
      const response = await axios.get('http://localhost/api', { 
        timeout: 2000 
      });
      
      if (response.status === 200) {
        console.log('Backend is ready!');
        
        // Run add-books script
        console.log('Adding books...');
        execSync('node ./scripts/add-books.js', { stdio: 'inherit' });
        return;
      }
    } catch (error) {
      console.log('Backend not ready yet. Retrying...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      retries++;
    }
  }

  console.error('Backend did not become ready in time');
  process.exit(1);
}

waitForBackend();