const express = require('express');
const app = express();

app.get('/greetings', (req, res) => {
    res.json({greeting: 'Hello World!'})
});

// Send a GET request to READ(view) a quote
// Send a GET request to READ(view) a list of quotes
// Send a GET request to READ(view) a random quote
// Send a POST request to CREATE a new quote
// Send a PUT request to UPDATE(edit) a quote
// Send a DELETE request to remove a quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));