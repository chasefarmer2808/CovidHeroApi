const express = require('express');
const mongoose = require('mongoose');
const counties = require('./routes/counties');

const app = express();
const port = 3000;
const dbUrl = 'mongodb://localhost:27017/covid';

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