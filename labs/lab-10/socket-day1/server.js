var startExpress = require('express');
var app = startExpress();

var http = require('http').createServer(app);

var startIo = require('socket.io');
var io = startIo(http);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// event listener for new socket connections
// requested by browsers
io.on('connection', (socket) => {

  console.log('a user connected', socket.id);
  console.log('----');

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    console.log('----');
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
