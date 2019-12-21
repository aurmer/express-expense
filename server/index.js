const express = require('express')
const APP = express()
const PORT = process.env.PORT || 3000
const knex = require('./db/knex/knex')

console.log(process.env.SECRET_MESSAGE)

APP.get('/', (req, res) => res.send('Hello World!'))

APP.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
