const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', AuthController.login)
// router.post('/checkToken', AuthController.login)

module.exports = router