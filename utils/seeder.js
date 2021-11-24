const Producer = require('../models/Producer');
const Movie = require('../models/Movie');

const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const producers = require('../data/producers');
const movies = require('../data/movies');

dotenv.config({ path: 'config.env' });

connectDatabase();

const seedProducers = async () => {
    try {
        
        await Producer.deleteMany();
        console.log('Producer deleted');

        await Producer.insertMany(producers);
        console.log('All Producers Added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

const seedMovies = async () => {
    try {
        
        await Movie.deleteMany();
        console.log('Movie deleted');

        await Movie.insertMany(movies);
        console.log('All Movies Added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducers();
seedMovies();