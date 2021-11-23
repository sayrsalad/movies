const mongoose = require('mongoose');

const connectDatabase = async() => {
    await mongoose.connect(process.env.ATLAS_URI)
        .then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        });

}

module.exports = connectDatabase;