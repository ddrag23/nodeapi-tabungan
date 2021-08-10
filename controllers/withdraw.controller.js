const withdrawModel = require('../models/withdraw')
const { body, validationResult } = require('express-validator')
exports.index = async (_, res) => {
  try {
    const [rows] = await withdrawModel.all()
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
  }
}

exports.validate = () => {
  return [
    body('user_id', 'nama nasaba tidak boleh kosong').notEmpty(),
    body('nominal', 'nominal tidak boleh kosong').notEmpty(),
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
    await withdrawModel.saved(req.body)
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
    const [rows] = await withdrawModel.find(req.params.id)
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
  }
}

exports.destroy = async (req, res) => {
  try {
    await withdrawModel.deleted(req.params.id)
    res.status(200).json({
      message: 'Data berhasil dihapus',
    })
  } catch (error) {
    console.log(error)
  }
}
