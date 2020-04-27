const express = require('express');
const mongoose = require('mongoose');
const counties = require('./routes/counties');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost:27017/covid';

if (process.env.NODE_ENV == 'production') {
    dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
}

mongoose.connect(dbUrl, { useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', dbUrl)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.get('/', (req, res) => res.send('hello'));
app.use('/counties', counties);

app.listen(port, () => console.log('Listening on 3000'));