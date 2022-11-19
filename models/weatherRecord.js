const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('WeatherRecord', schema)