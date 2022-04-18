const jwt = require('jsonwebtoken')

// Login Form Inputs
const emailData = "agc@gmail.com"
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
      // to test
      // setInterval(function() {
      //   res.send({
      //     success: true,
      //     message: "Logged in",
      //     data: {
      //       user: jwtInfo,
      //       token: jwtSignUser(jwtInfo)
      //     }
      //   })
      // },2000)
  },

  // Add partner
  async addPartner(req, res) {
    // console.log(req.body)
    const {
      legalName, VATNo, chamberOfCommerceNo, legalAddress, partnerType,
      name, surname, tckn, email, password
    } = req.body

    if (legalName === undefined || VATNo === undefined || chamberOfCommerceNo === undefined || legalAddress === undefined || partnerType === undefined || 
      name === undefined || surname === undefined || tckn === undefined || email === undefined || password === undefined) {
      // console.log('400', legalName,VATNo, chamberOfCommerceNo, legalAddress, partnerType, name, surname, tckn, email, password)
      return res.status(400).send({
        success: false,
        message: "Please check values"
      })
    }

    if (VATNo !== 'vatno') {
      return res.status(400).send({
        success: false,
        message: "Check VATNo"
      })
    }
  
    res.send({
      success: true,
      message: "Saved",
    })
    // to test
    // setInterval(function() {
    //   res.send({
    //     success: true,
    //     message: "Saved",
    //   })
    // },2000)
  },

  // Checks if the token is valid
  checkToken(req, res) {
    const token = req.headers['x-access-token']

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)  {
        res.status(401).send({ auth: false, message: 'Failed to authenticate token' })
      } else {
        res.status(200).send(decoded)
      }
    })
  },
}

// Authtentication
// router.post('/login', (req, res))
// router.post('/register', (req, res))
// router.post('/forgot', (req, res))
// router.post('/verify', (req, res))