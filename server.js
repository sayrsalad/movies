const app = require('./app')
const connectDatabase = require('./config/database');

const cloudinary = require('cloudinary');

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config.env' })

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});