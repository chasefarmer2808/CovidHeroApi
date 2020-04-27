const express = require('express');
const router = express.Router();
const Counties = require('../schemas/counties-schema');

router.get('/', async (req, res) => {
    const counties = await Counties.find();
    res.send(counties);
});

router.get('/latest/:state/:county', async (req, res) => {
    const state = req.params['state'];
    const county = req.params['county'];

    const latestCount = await Counties.findOne({
        state,
        county
    }).sort({ date: -1 });

    res.send(latestCount);
})

module.exports = router;