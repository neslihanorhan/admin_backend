const jwt = require('jsonwebtoken')

const emailData = "neslihan@gmail.com"
const passwordData = "12345678"

function jwtSignUser(user) {
  const ONE_DAY = 60 * 60 * 24
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_DAY
  })
}

module.exports = {
  async login(req, res) {
    const { email, password } = req.body

      if (email === undefined || password === undefined) {
        return res.status(400).send({
          success: false,
          message: "Please check email and password"
        })
      }

      if (email !== emailData) {
        return res.status(403).send({
          success: false,
          message: "This account does not exist"
        })
      }

      if (password !== passwordData) {
        return res.status(403).send({
          success: false,
          message: "Wrong password"
        })
      }

      const jwtInfo = {
        id: 1044,
        name: 'neslihan demir',
        email: emailData,
        type: "user",
      }

      res.send({
        success: true,
        message: "Logged in",
        data: {
          user: jwtInfo,
          token: jwtSignUser(jwtInfo)
        }
      })
  },
  register(req, res) {

  },
}

// Authtentication
// router.post('/login', (req, res))
// router.post('/register', (req, res))
// router.post('/forgot', (req, res))
// router.post('/verify', (req, res))