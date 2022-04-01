const express = require('express')
const AuthController = require('../controller/AuthController')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', AuthController.login)
// router.post('/checkToken', AuthController.login)

module.exports = router