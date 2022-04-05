const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

const allowedOrigins = ['http://localhost:3000']
const corsOptions = function (req, callback) {
  let option;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1)
    option = {
      origin: req.header('Origin'),
      methods: "POST, PUT, OPTIONS, DELETE, GET",
      allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
      credentials: true
    };
  else
    option = { origin: false };

  callback(null, option);
}

app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})