import http from 'http'
import {
  env,
  port,
  ip,
  apiRoot
} from './config'
import express from './services/express'
import routes from './routes'

const PORT = process.env.PORT || 5000
const app = express(apiRoot, routes)
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})


io.on('connection', function (socket) {
  console.log('User Connected : ', socket.id);

  socket.on('send-demande', function (dem) {
    io.emit('receive-demande', dem);
  });

  socket.on('send-response', function (dem) {
    io.emit('result-demande', dem);
  });
});

setImmediate(() => {
  server.listen(PORT, () => console.log(`Listening on ${PORT}`))
})

export default app
