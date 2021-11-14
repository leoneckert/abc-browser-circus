let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// general event listener for any socket connection
io.on('connection', (socket) => {
  // code inside here is per connection
  // for each connection we console log this
  console.log('a user connected', socket.id);
  // for each connection we establish an event listener
  // for when that conection disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.on("message", (data)=>{
    console.log(data)
    io.emit("incoming", data);

  })



});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
