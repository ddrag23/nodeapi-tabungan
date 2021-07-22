function isAdmin(req, res, next) {
  if (req.user.data.role === 'admin') {
    next()
  } else {
    return res.status(403).json({
      msg: 'Forbidden access',
    })
  }
}
function isUser(req, res, next) {
  if (req.user.data.role === 'user') {
    next()
  } else {
    return res.status(403).json({
      msg: 'Forbidden access',
    })
  }
}
module.exports = {
  isAdmin,
  isUser,
}
