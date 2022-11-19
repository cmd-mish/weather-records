'use strict';
const axios = require('axios')
const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI
const WeatherRecord = require('./models/weatherRecord')

mongoose.connect(DB_URI)
  .then(() => {
    console.log(`connected to ${DB_URI}`)
  })
  .catch((error) => {
    console.log(`error occured: ${error}`)
  })

// Records a new weather value to the database
module.exports.processWeatherRecord = async (event) => {
  const currentTimestamp = new Date().toISOString().split('.')[0]
  const newRecord = new WeatherRecord({
    timestamp: currentTimestamp,
    temperature: 0,
    humidity: 5
  })

  const response = await newRecord.save()
  return response
}