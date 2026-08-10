const mongoose = require('mongoose');
const travelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    country: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    image: {
        type: [String],
        required: false
    }
    
});

module.exports = mongoose.model('Travel', travelSchema);