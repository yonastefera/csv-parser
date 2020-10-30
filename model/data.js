const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/secret');


mongoose.connect(config.database, { useMongoClient : true});

const db = mongoose.connection;

db.on('error', () => {
    console.log(`you have a connection error`);
});

db.once('open', () => {
    console.log(`db is connected`);
});

const DataSchema = new Schema({
    personA : {
        type : String
    },
    personB : {
        type : String
    },
    amount : {
        type : Number
    }
});

module.exports = mongoose.model('ClientSchema', DataSchema);