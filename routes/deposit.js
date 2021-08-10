const express = require('express')
const depositController = require('../controllers/deposit.controller')
const router = express.Router()

router.get('/', depositController.index)
router.get('/show/:id', depositController.show)
router.post('/store', depositController.validate(), depositController.store)

router.delete(
  '/delete/:id',
  depositController.validate(),
  depositController.destroy,
)
module.exports = router
