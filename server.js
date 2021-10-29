require('dotenv').config({path: "./config.env"});

const express = require('express');
const connectDB = require('./config/db');

connectDB();

const MovieRouter = require('./routes/movie');
const ActorRouter = require('./routes/actor');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/movie', MovieRouter);
app.use('/actor', ActorRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});