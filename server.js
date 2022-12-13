const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Get a list of all the HTML files in the 'public' directory
const htmlFiles = fs.readdirSync('public')
  .filter((file) => path.extname(file) === '.html');

// Create a route for each HTML story that redirects to the menu page
htmlFiles.forEach((file) => {
  app.get(`/${file}`, (req, res) => {
    res.redirect('/menu.html');
  });
});


// Serve the menu page
app.get('/menu.html', (req, res) => {
  // Generate the HTML for the menu page
  const style = fs.readFileSync('public/style.css', 'utf8');
  const menuHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Story Menu</title>
    <style>${style}</style>
  </head>
  <body>
    <h1>Story Menu</h1>
    <ul>
      ${htmlFiles.map((file) => `<li><a href="/${file}">${file}</a></li>`).join('')}
    </ul>
  </body>
  </html>
`;

  // Send the menu HTML to the client
  res.send(menuHtml);
});

// Serve the menu page when the root URL is requested
app.get('/', (req, res) => {
  res.redirect('/menu.html');
});


// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
