const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let dbUrl = 'mongodb://localhost:27017/covid';
let _db;

if (process.env.NODE_ENV == 'production') {
    dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
}

const connectDb = async (cb) => {
    try {
        MongoClient.connect(dbUrl, (err, db) => {
            console.log('Database connected: ', dbUrl);
            _db = db.db('covid');
            return cb(err);
        })
    } catch(e) {
        throw e
    }
}

const getDb = () => _db;
const getCountiesCollection = () => _db.collection('counties');
const disconnectDb = () => _db.close();

module.exports = { connectDb, getDb, getCountiesCollection, disconnectDb };