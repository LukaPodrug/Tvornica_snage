const postgres = require('postgres')

require('dotenv').config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`
const database = postgres(connectionString, {ssl: 'require'})

module.exports = database