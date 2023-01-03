const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const adminAuthRoute = require('./routes/admin/auth')

const { PORT } = process.env

const app = express()

app.use(bodyParser.json({limit: '5mb'}))

app.use('/api/admin/auth', adminAuthRoute)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})