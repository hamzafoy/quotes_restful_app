const express = require('express');
const router = express.Router();
const records = require('./records');


function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

// Send a GET request to /quotes/:id to READ(view) a quote

router.get('/quotes/:id', async (req, res) => {
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

router.get('/quotes', async (req, res) => {
    try {
    const quotes = await records.getQuotes();
    res.json(quotes);
    } catch(err) {
        res.json({message: err.message});
    };
});

// Send a GET request to /quotes/quote/random to READ(view) a random quote

router.get('/quotes/quote/random', async (req, res, next) => {
    try {
        const randomQuote = await records.getRandomQuote();
        res.json(randomQuote);
    } catch(err) {
        next(err);
    }
})

// Send a POST request to /quotes to CREATE a new quote

/* app.post('/quotes', async (req, res) => {
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
}); */

router.post('/quotes', asyncHandler( async (req, res) => {
    if (req.body.author && req.body.quote) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author,
        });
        res.status(201).json(quote);
    } else {
        res.status(400).json({message: "Your submission is incomplete or contains an error."})
    }
}));

// Send a PUT request to /quotes/:id to UPDATE(edit) a quote

/* app.put('/quotes/:id', async (req, res) => {
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
}); */

router.put('/quotes/:id', asyncHandler( async (req,res) => {
    const quote = await records.getQuote(req.params.id);
    if(quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Quote not found!"});
    }
}));

// Send a DELETE request to /quotes/:id to remove a quote

router.delete('/quotes/:id', async (req, res) => {
    try {
        if(quote) {
        const quote = await records.getQuote(req.params.id);
        await records.deleteQuote(quote);
        res.status(204).end();
        } else {
            res.status(404).json({message: "Quote not found!"});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;