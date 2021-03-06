const express = require('express');
const router = express.Router();
const mongoClient = require('../db/db');

router.get('/', async (req, res) => {
    const Counties = mongoClient.getCountiesCollection();
    const counties = await Counties.find().toArray();
    res.send(counties);
});

router.get('/list', async (req, res) => {
    const Counties = mongoClient.getCountiesCollection();

    const aggregate = [
        {
          '$sort': {
            'date': 1
          }
        }, {
          '$group': {
            '_id': {
              'state': '$state',
              'county': '$county'
            }, 
            'state': {
              '$first': '$state'
            }, 
            'county': {
              '$first': '$county'
            }
          }
        }, {
          '$sort': {
            'county': 1
          }
        }, {
          '$sort': {
            'state': 1
          }
        }
      ]

    const counties = await Counties.aggregate(aggregate).toArray();
    console.log(counties.length)
    
    res.send(counties)
});

router.get('/:state/:county/latest', async (req, res) => {
    const Counties = mongoClient.getCountiesCollection();
    const state = req.params['state'];
    const county = req.params['county'];

    const latestCount = await Counties.find({
        state,
        county
    })
    .sort({ date: -1 })
    .limit(1).toArray();

    if (latestCount.length) {
        res.send(latestCount[0])
    }
    else {
        res.status(404)
    }
});

router.get('/:state/:county', async (req, res) => {
    const Counties = mongoClient.getCountiesCollection();
    const state = req.params['state'];
    const county = req.params['county'];
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    const counts = await Counties.find({
        state,
        county,
        date: {
            $gte: startDate,
            $lte: endDate
        }
    })
    .sort({ date: 1 })
    .toArray();
    
    res.send(counts);
});

module.exports = router;