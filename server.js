require('dotenv').config({path: "./config.env"});

const express = require('express');
const connectDatabase = require('./config/database');
const cors = require('cors');
const errorHandler = require('./middleware/error');

connectDatabase();

const AuthRouter = require('./routes/auth');
const PrivateRouter = require('./routes/private');
const MovieRouter = require('./routes/movie');
const ActorRouter = require('./routes/actor');
const ProducerRouter = require('./routes/producer');
const GenreRouter = require('./routes/genre');

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', AuthRouter);
app.use('/api/private', PrivateRouter);
app.use('/api/movie', MovieRouter);
app.use('/api/actor', ActorRouter);
app.use('/api/producer', ProducerRouter);
app.use('/api/genre', GenreRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});