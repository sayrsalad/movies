const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./middleware/error');

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config.env' })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const AuthRouter = require('./routes/auth');
const MovieRouter = require('./routes/movie');
const ActorRouter = require('./routes/actor');
const ProducerRouter = require('./routes/producer');
const GenreRouter = require('./routes/genre');

app.use('/api/auth', AuthRouter);
app.use('/api/movie', MovieRouter);
app.use('/api/actor', ActorRouter);
app.use('/api/producer', ProducerRouter);
app.use('/api/genre', GenreRouter);


app.use(errorHandler);

module.exports = app;