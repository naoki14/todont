const express = require('express');
const app     = express();
const path    = require('path');

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
    console.log("GET [/]");
    let data = {
        query: req.query, // encoded in the url
        body: req.body,   // sent in body
        params: req.params, //
        ip: req.ip,
    };
    console.log(data);
    res.send(JSON.stringify(data));
});

// Create a route for POST requests 
app.post('/html/todont.html', (req, res) => {
    console.log("POST [/html/todont.html]")
    let data = {
        query: req.query,   // data passed directly the URL query string
        body: req.body,     // data passed from the request body (automatically sent via browser)
        params: req.params, // data captured from named url parameters (see notes on this)
    };
    console.log(data);
    res.send(JSON.stringify(data));
});

app.get("/todont_list", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/todont.html'));
});

app.post("/add_todont", (req, res) => {
    const data = req.body;
    console.log(data);
    todont_array.push(data);
    res.send(JSON.stringify(todont_array));
});

// Listen on port 80 (Default HTTP port)
app.listen(80, () => {
    console.log("Listening on port 80.");
});