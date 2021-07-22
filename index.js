const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const router = require('./routes')
// const authRouter = require('./routes/auth')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
// app.use(expressValidator())
app.get('/', (req, res) => res.send('hello word'))
app.use(router)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
