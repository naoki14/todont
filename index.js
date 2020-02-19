const express = require('express');
const app     = express();
const path    = require('path');

// Gives direct access to GET files from the
// "public" directory (you can name the directory anything)
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Listen on port 80 (Default HTTP port)
app.listen(80, () => {
    console.log("Listening on port 80.");
});