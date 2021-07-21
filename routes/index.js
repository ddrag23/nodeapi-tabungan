const express = require('express')
const authenticate = require('../middleware/authenticate')
const authRouter = require('./auth')
const app = express.Router()
app.use('/auth', authRouter)
app.get('/test', authenticate, (req, res) => res.json(req.user))

module.exports = app
