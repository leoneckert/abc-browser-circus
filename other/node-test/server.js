// var app = require('express')();

const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});


// const express = require('express')
// const app = express()
// const port = 3000
//
// app.use(express.static('public'))
//
// // app.get('/', (req, res) => {
