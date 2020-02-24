const express = require('express');
const app     = express();
const path    = require('path');

// In-memory array used to store all todont items being sent to
// the server.
let todont_array = [];

// Gives direct access to GET files from the
// "public" directory (you can name the directory anything)
app.use(express.static('public'));

// We need this line so express can parse the POST data the browser
// automatically sends
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.redirect('/todont_list');
});

app.get("/todont_list", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/todont.html'));
});

app.get("/todont_items", (req, res) => {
    res.send(JSON.stringify({todont_items: todont_array}));
});

app.post("/add_todont", (req, res) => {
    const data = req.body;
    console.log(data);
    todont_array.push(data);
    res.sendStatus(200);
});

// Listen on port 80 (Default HTTP port)
app.listen(80, () => {
    console.log("Listening on port 80.");
});