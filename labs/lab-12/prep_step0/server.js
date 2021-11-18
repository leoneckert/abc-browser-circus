const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))


let online = []

io.on('connection', (socket) => {
  console.log('a user connected');
  online.push({
    socketID: socket.id,
    peerID: uuid()
  });
  console.log(online)


  socket.on("disconnect", ()=>{
    let idxToDelete = online.findIndex(user=>{
      return user.socketID == socket.id;
    })
    console.log(idxToDelete);
    if(idxToDelete!=-1){
      online.splice(idxToDelete, 1);
    }
    console.log(online)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});



// create unique id
// from: https://www.codegrepper.com/code-examples/javascript/javascript+generate+unique+key
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
