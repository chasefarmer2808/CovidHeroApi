const express = require('express');
const mongoClient = require('./db/db');
const counties = require('./routes/counties');

const app = express();
const port = process.env.PORT || 3000;

mongoClient.connectDb(async (err) => {
  if (err) console.error(err);

  app.get('/', (req, res) => res.send('hello'));
  app.use('/counties', counties);

  app.listen(port, () => console.log('Listening on 3000'));
});