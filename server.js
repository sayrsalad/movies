require('dotenv').config({path: "./config.env"});

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const MovieRouter = require('./routes/movie');
const ActorRouter = require('./routes/actor');
const ProducerRouter = require('./routes/producer');
const GenreRouter = require('./routes/genre');

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/movie', MovieRouter);
app.use('/actor', ActorRouter);
app.use('/producer', ProducerRouter);
app.use('/genre', GenreRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});