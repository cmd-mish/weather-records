'use strict'
const axios = require('axios')
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WeatherRecord = require('./models/weatherRecord')

mongoose.connect(DB_URI)
  .then(() => {
    console.log(`connected to database`)
  })
  .catch((error) => {
    console.log(`error occured: ${error}`)
  })

const retreiveWeatherData = async () => {
  const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=${WEATHER_API_KEY}`)
  return {
    temperature: data.main.temp,
    humidity: data.main.humidity
  }
}

// Records a new weather value to the database
module.exports.processWeatherRecord = async (event) => {
  try {
    const currentTimestamp = new Date().toISOString().split('.')[0]
    const weatherData = await retreiveWeatherData()
    const newRecord = new WeatherRecord({
      ...weatherData,
      timestamp: currentTimestamp,
    })

    const response = await newRecord.save()
    return {
      statusCode: 200,
      headers: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      },
      body: response
    }
  } catch (exception) {
    throw new Error(JSON.stringify(exception))
  }
}