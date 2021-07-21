const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.login = async (req, res, next) => {
  try {
    const response = {
      data: '',
      message: '',
      token: '',
    }
    const [rows] = await userModel.findByUsername(req.body.username)
    if (rows) {
      const match = await bcrypt.compare(req.body.password, rows[0].password)
      if (match) {
        const token = jwt.sign({ data: rows }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        })
        response.data = rows
        response.message = 'Sukses'
        response.token = token
      } else {
        response.message = 'Password yang anda masukkan salah'
      }
    } else {
      response.message = 'Username yang anda masukkan salah'
    }
    res.status(201).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}
