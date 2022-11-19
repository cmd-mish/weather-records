'use strict';
const axios = require('axios')

module.exports.run = (event) => {
  const time = new Date()
  console.log(`Lambda run at ${time}`)
}