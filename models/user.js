const db = require('../config/db')
const bcrypt = require('bcrypt')
exports.findByUsername = (username) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  return db.execute(query, [username])
}
exports.find = (id) => {
  const query = 'SELECT * FROM users WHERE id = ?'
  return db.execute(query, [id])
}

exports.all = () => {
  const query = 'SELECT * FROM users'
  return db.execute(query)
}
exports.saved = async (params) => {
  try {
    const hashPassword = await bcrypt.hash(params.password, 8)
    const query =
      'INSERT INTO users (nama,username,password,role,age,gender) VALUES (?,?,?,?,?,?)'
    return db.execute(query, [
      params.nama,
      params.username,
      hashPassword,
      params.role,
      params.age,
      params.gender,
    ])
  } catch (error) {
    console.error(error)
  }
}
