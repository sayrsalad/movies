const Filter = require("bad-words");

// Make a new filter
const filter = new Filter();

// https://www.cs.cmu.edu/~biglou/resources/
// Add extra words to the bad words list
const words = require("./extra-words.json");
filter.addWords(...words);

module.exports = filter;