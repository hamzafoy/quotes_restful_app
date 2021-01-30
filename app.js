const { response } = require('express');
const express = require('express');
const app = express();
const records = require('./records');

app.use(express.json());

app.get('/greetings', (req, res) => {
    res.json({greeting: 'Hello World!'})
});

// Send a GET request to /quotes/:id to READ(view) a quote

app.get('/quotes/:id', async (req, res) => {

    try {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({message: 'The quote you requested is not found.'})
    }
    } catch(err) {
        res.json({message: err.message});
    };
});

// Send a GET request to /quotes to READ(view) a list of quotes

app.get('/quotes', async (req, res) => {
    try {
    const quotes = await records.getQuotes();
    res.json(quotes);
    } catch(err) {
        res.json({message: err.message});
    };
});

// Send a GET request to /quotes/quote/random to READ(view) a random quote
// Send a POST request to /quotes to CREATE a new quote

app.post('/quotes', async (req, res) => {
    try {
        if (req.body.author && req.body.quote) {
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author,
            });
            res.status(201).json(quote);
        } else {
            res.status(400).json({message: "Your submission is incomplete or contains an error."})
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    };
});
// Send a PUT request to /quotes/:id to UPDATE(edit) a quote

app.put('/quotes/:id', async (req, res) => {
    try {
        const quote = await records.getQuote(req.params.id);
        if(quote){
            quote.quote = req.body.quote;
            quote.author = req.body.author;
            await records.updateQuote(quote);
            res.status(204).end();
        } else {
            res.status(404).json({message: "Quote not found!"});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})
// Send a DELETE request to /quotes/:id to remove a quote

app.listen(3000, () => console.log('Quote API listening on port 3000!'));