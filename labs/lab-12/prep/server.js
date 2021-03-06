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
  // let peerID = uuid();
  // socket.emit("peerID", peerID)
  //
  // setTimeout(()=>{
  //   socket.emit("call", online)
  //
  //   online.push({
  //     socketID: socket.id,
  //     peerID: peerID
  //   });
  //   console.log(online)
  // }, 1000)
  socket.on("signup", (msg)=>{
    console.log("signup", msg)
    socket.emit("call", online)
    online.push({
      socketID: socket.id,
      peerID: msg
    });
    console.log(online)
  })



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
