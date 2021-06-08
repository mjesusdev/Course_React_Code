const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB Online');

    } catch( error ) {
        throw new Error('Error connect to database ❗');
    }

}

module.exports = { 
    dbConnection
}