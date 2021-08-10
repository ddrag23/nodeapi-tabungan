const db = require('../config/db')
exports.find = (id) => {
  const query = 'SELECT * FROM withdraw WHERE id = ?'
  return db.execute(query, [id])
}

exports.all = () => {
  const query =
    'SELECT users.name,withdraw.* FROM withdraw JOIN users ON users.id = withdraw.user_id'
  return db.execute(query)
}
exports.pagination = (limit, skip) => {
  const query = `SELECT * FROM withdraw LIMIT ${limit} OFFSET ${skip}`
  return db.execute(query)
}
exports.saved = async (params) => {
  try {
    const { user_id, nominal } = params
    const query = 'INSERT INTO withdraw (user_id,nominal) VALUES (?,?)'
    return db.execute(query, [user_id, nominal])
  } catch (error) {
    throw error
  }
}
exports.deleted = (id) => {
  try {
    const query = `DELETE FROM withdraw WHERE id=${id}`
    return db.execute(query)
  } catch (err) {
    throw err
  }
}
