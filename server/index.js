const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const adminAuthRoute = require('./routes/admin/auth')
const adminTrainingRoute = require('./routes/admin/training')

const userAuthRoute = require('./routes/user/auth')

const { PORT } = process.env

const app = express()

app.use(bodyParser.json({limit: '5mb'}))

app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/admin/training', adminTrainingRoute)

app.use('/api/user/auth', userAuthRoute)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})