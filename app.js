const express = require('express');
const app = express();

app.get('/greetings', (req, res) => {
    res.json({greeting: 'Hello World!'})
});

// Send a GET request to /quotes/:id to READ(view) a quote
// Send a GET request to /quotes to READ(view) a list of quotes
// Send a GET request to /quotes/quote/random to READ(view) a random quote
// Send a POST request to /quotes to CREATE a new quote
// Send a PUT request to /quotes/:id to UPDATE(edit) a quote
// Send a DELETE request to /quotes/:id to remove a quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));