const authenticate = require('./authenticate')
const { isAdmin, isUser } = require('./is-role')
module.exports = {
  authenticate,
  isAdmin,
  isUser,
}
