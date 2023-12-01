const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

const adminAuthRoute = require('./routes/admin/auth')
const adminTrainingRoute = require('./routes/admin/training')
const adminReservationRoute = require('./routes/admin/reservation')
const adminUserRoute = require('./routes/admin/user')
const adminCoachRoute = require('./routes/admin/coach')
const adminProgramRoute = require('./routes/admin/program')

const userAuthRoute = require('./routes/user/auth')
const userTrainingRoute = require('./routes/user/training')
const userReservationRoute = require('./routes/user/reservation')
const userUserRoute = require('./routes/user/user')
const userCoachRoute = require('./routes/user/coach')
const userPartnerRoute = require('./routes/user/partner')

const { PORT } = process.env

const app = express()

const corsOptions = {
  exposedHeaders: 'Authorization'
}
app.use(cors(corsOptions))
app.use(bodyParser.json({limit: '5mb'}))

app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/admin/training', adminTrainingRoute)
app.use('/api/admin/reservation', adminReservationRoute)
app.use('/api/admin/user', adminUserRoute)
app.use('/api/admin/coach', adminCoachRoute)
app.use('/api/admin/program', adminProgramRoute)

app.use('/api/user/auth', userAuthRoute)
app.use('/api/user/training', userTrainingRoute)
app.use('/api/user/reservation', userReservationRoute)
app.use('/api/user/user', userUserRoute)
app.use('/api/user/coach', userCoachRoute)
app.use('/api/user/partner', userPartnerRoute)

app.get('/', (req, res) => {
  res.status(200).json('App recieved get request')
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})