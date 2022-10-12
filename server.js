const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.get(`/api/quotes/random`, (req, res) => {
	const randomQuote = getRandomElement(quotes);
	const quote = {
		quote: randomQuote,
	};
	console.log(`sending`, quote);
	res.send(quote);
});

app.get(`/api/quotes`, (req, res) => {
	const query = req.query.person;
	const allQuotes = {
		quotes: quotes,
	};
	const quotesByAuthor = {
		quotes: [],
	};
	console.log({ query });
	// let quotesByAuthor = [];
	if (query === '') {
		console.log('sending', allQuotes);
		res.send(allQuotes);
	}
	if (query !== '') {
		quotes.forEach((quote) => {
			if (quote.person === query) {
				quotesByAuthor.quotes.push(quote);
			}
		});
		console.log('sending', quotesByAuthor);
		res.send(quotesByAuthor);
	}
});

app.post('/api/quotes', (req, res) => {
	const query = req.query;
	const newQuote = {
		quote: query,
	};
	if (query.quote === '' || query.person === '') {
		console.log(query);
		res.status(400);
	} else {
		quotes.push(query);
		res.send(newQuote);
	}
});

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`app is listening`, PORT);
});
