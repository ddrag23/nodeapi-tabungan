const express = require('express')
const authenticate = require('../middleware/authenticate')
const { isAdmin, isUser } = require('../middleware/is-role')
const authRouter = require('./auth')
const app = express.Router()
app.use('/auth', authRouter)
app.get('/admin', authenticate, isAdmin, (req, res) => res.json(req.user))
app.get('/user', authenticate, isUser, (req, res) => res.json(req.user))

module.exports = app
