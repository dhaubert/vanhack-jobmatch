if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
  if (!process.env.NODE_ENV) {
    console.log(
      'Please, initialize your environment variables filling .env file.'
    )
  }
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes.js')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
  connectedUsers[user] = socket.id
  console.log('Client connected:', user)
})

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-k1irx.gcp.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
)

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 3333
server.listen(port)
