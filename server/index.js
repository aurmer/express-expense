const express = require('express')
const APP = express()
const PORT = 3000

console.log(process.env.SECRET_MESSAGE)

APP.get('/', (req, res) => res.send('Hello World!'))

APP.listen(port, () => console.log(`Example app listening on port ${PORT}!`))
