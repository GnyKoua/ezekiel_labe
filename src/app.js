import http from 'http'
import {
  env,
  port,
  ip,
  apiRoot
} from './config'
import express from './services/express';
// import routes from './routes';
import routes from './NewRoutes';

const PORT = process.env.PORT || 5000
const app = express(apiRoot, routes)
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});


io.on('connection', function (socket) {
  console.log('User Connected : ', socket.id);

  socket.on('demande', function (dem) {
    io.emit('demande', dem);
  });

  socket.on('response-demande', function (dem) {
    io.emit('response-demande', dem);
  });

  // socket.on('join-room', function (numeroCommande) {
  //   socket.join(numeroCommande);
  // });

  // socket.on('leave-room', function (numeroCommande) {
  //   socket.leave(numeroCommande);
  // });

  socket.on('livreur-livraison', function (livr) {
    io.emit('client-livraison', livr);
  });

  socket.on('position-livreur', function (obj) {
    io.emit('position-livreur', obj);
  });

  socket.on('message', function (obj) {
    io.emit('message', (obj));
  });
});

setImmediate(() => {
  server.listen(PORT, () => console.log(`Server run on ${PORT}`))
})

export default app
