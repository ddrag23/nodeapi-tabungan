const db = require('../config/db')
const bcrypt = require('bcrypt')
exports.findByUsername = (username) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  return db.execute(query, [username])
}
