const express = require('express')
const { authenticate, isUser, isAdmin } = require('../middleware')
const authRouter = require('./auth')
const withdrawRouter = require('./withdraw')
const depositRouter = require('./deposit')
const app = express.Router()
app.use('/auth', authRouter)
app.use('/withdraw', authenticate, isAdmin, withdrawRouter)
app.use('/deposit', authenticate, isAdmin, depositRouter)
app.get('/admin', authenticate, isAdmin, (req, res) => res.json(req.user))
app.get('/user', authenticate, isUser, (req, res) => res.json(req.user))

module.exports = app
