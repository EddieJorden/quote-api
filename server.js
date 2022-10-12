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

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`app is listening`, PORT);
});
