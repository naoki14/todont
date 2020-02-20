const express = require('express');
const app     = express();
const path    = require('path');

// Gives direct access to GET files from the
// "public" directory (you can name the directory anything)
app.use(express.static('public'));

// We need this line so express can parse the POST data the browser
// automatically sends
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
    console.log("POST [/]");
    let data = {
        query: req.query,
        body: req.body,
        params: req.params,
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

// We create a GET route that servers our todont.html file via a "slug"
// a slug is just a route that is easier and nicer to read/remember for users
// it's easer to remember /todont_list rather than /html/todont.html
// this also helps us decouple our URL routes from our filesystem
// if users had to share the /html/todont.html link then we restrict our ability
// modify the resource. Using this slug we can swap out the actual file as necessary
// and all of the links are still valid
app.get("/todont_list", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/todont.html'));
});

// Listen on port 80 (Default HTTP port)
app.listen(80, () => {
    console.log("Listening on port 80.");
});