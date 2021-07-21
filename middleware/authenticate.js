const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1]
  if (token) {
    return jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        })
      }
      req.user = decoded
      return next()
    })
  }
  return res.unauthorized()
}
