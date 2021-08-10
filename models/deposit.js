const db = require('../config/db')
exports.find = (id) => {
  const query = 'SELECT * FROM deposit WHERE id = ?'
  return db.execute(query, [id])
}

exports.all = () => {
  const query =
    'SELECT users.name,deposit.* FROM deposit JOIN users ON users.id = deposit.user_id'
  return db.execute(query)
}
exports.pagination = (limit, skip) => {
  const query = `SELECT * FROM deposit LIMIT ${limit} OFFSET ${skip}`
  return db.execute(query)
}
exports.saved = async (params) => {
  db.getConnection((err, conn) => {
    if (err) throw err
    conn.beginTransaction((err) => {
      if (err) throw err
      const { user_id, nominal } = params
      const query = 'INSERT INTO deposit (user_id,nominal) VALUES (?,?)'
      conn.execute(query, [user_id, nominal], (err) => {
        if (err) {
          return conn.rollback(() => {
            throw err
          })
        }
        conn.release()
      })

      const getTabungan = 'SELECT * FROM tabungan WHERE user_id = ?'
      const tabungan = conn.query(
        getTabungan,
        [user_id],
        (err, result, field) => {
          return field
        },
      )
      console.log(tabungan)
      let queryTabungan = ''
      if (tabungan.length > 0) {
        queryTabungan =
          'UPDATE tabungan SET user_id=?, amount=? WHERE user_id = ?'
        conn.execute(queryTabungan, [user_id, nominal, user_id], (err) => {
          if (err) {
            return conn.rollback(() => {
              throw err
            })
          }
        })
      } else {
        queryTabungan = 'INSERT INTO tabungan (user_id,amount) VALUES (?,?)'
        conn.execute(queryTabungan, [user_id, nominal], (err) => {
          if (err) {
            return conn.rollback(() => {
              throw err
            })
          }
        })
      }
      conn.commit((err) => {
        if (err) {
          return conn.rollback(function () {
            throw err
          })
        }
      })
    })
    conn.release()
  })
}
exports.deleted = (id) => {
  try {
    const query = `DELETE FROM deposit WHERE id=${id}`
    return db.execute(query)
  } catch (err) {
    throw err
  }
}
