const mongoose = require('mongoose');

const BeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brewery: {
        type: String,
        required: true,
    },
    abv: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    }
});


const Beer = mongoose.model('Beer', BeerSchema);

module.exports = Beer;