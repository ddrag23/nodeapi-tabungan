const userModel = require('../models/user')
const { body, validationResult } = require('express-validator')
exports.index = async (_, res) => {
  try {
    const user = await userModel.all()
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
  }
}

exports.validate = () => {
  return [
    body('username', 'username tidak boleh kosong').notEmpty(),
    body('email', 'email tidak boleh kosong').notEmpty(),
    body('alamat', 'alamat tidak boleh kosong').notEmpty(),
    body('gender', 'jenis kelamin tidak boleh kosong').notEmpty(),
    body('notelp', 'no telepon tidak boleh kosong').notEmpty(),
    body('role', 'role tidak boleh kosong').notEmpty(),
    body('age', 'umur tidak boleh kosong').notEmpty(),
    body('password', 'password tidak boleh Kosong').notEmpty(),
  ]
}
exports.store = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      })
    }
    await userModel.saved(req.body)
    res.json({
      success: true,
      status: 200,
      message: 'Data berhasil dimasukkan',
    })
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }
}

exports.show = async (req, res) => {
  try {
    const [rows] = await userModel.find(req.params.id)
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
  }
}
