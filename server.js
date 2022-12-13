const express = require('express');
const fs = require('fs');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Get a list of all the files in the 'public' directory
const files = fs.readdirSync('public');

// Create a route for each file that returns the contents of the file
files.forEach((file) => {
  app.get(`/${file}`, (req, res) => {
    res.send(fs.readFileSync(`public/${file}`, 'utf8'));
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
