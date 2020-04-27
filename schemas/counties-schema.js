const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countiesSchema = new Schema({
    date: Date,
    county: String,
    state: String,
    fips: String,
    cases: Number,
    deaths: Number
});

module.exports = mongoose.model('Counties', countiesSchema);