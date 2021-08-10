const express = require('express')
const withdrawController = require('../controllers/withdraw.controller')
const router = express.Router()

router.get('/', withdrawController.index)
router.get('/show/:id', withdrawController.show)
router.post('/store', withdrawController.validate(), withdrawController.store)

router.delete(
  '/delete/:id',
  withdrawController.validate(),
  withdrawController.destroy,
)
module.exports = router
