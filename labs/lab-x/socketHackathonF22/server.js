// inspo https://www.instagram.com/p/BSSJ58LgtYJ/

const express = require('express');
const app = express(); //handles routes
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

const http = require('http'); //...knows how to talk http protocol
const server = http.createServer(app); //create a server and tell it to delegate route hadnling to epress


// help: https://www.npmjs.com/package/cors
// help: http://johnzhang.io/options-request-in-express

let allowedPorts = [8080, 3000, 5500];
var a = allowedPorts.map(port=>'http://localhost:'+port)
var b = allowedPorts.map(port=>'http://127.0.0.1:'+port)
    // console.log(whitelist)
var whitelist = a.concat(b)


const { Server } = require("socket.io"); // ...knows how to speak websocket
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ["GET", "POST"]
  }
}); // create socket server that builds on top of http server


app.use(express.static('public'));




// text
// button
// value 0-100 (e.g. slider)
// single boolean
// boolean array
// value array

let connected = [];


// this event will be fired when a client
// connects via socket
io.on('connection', (socket) => {
  // all we want to do with the client, we need to do in here.
  console.log('a user connected', socket.id);
  socket.emit('singleId', {value: socket.id})
  
  connected.push(socket.id);
  // console.log(connected)
  connected.forEach(id=>{
    let copy = [...connected];
    io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
  })
  

  // text
  socket.on('textToAllButMe', (msg) => {
    socket.broadcast.emit("text", {from: socket.id, value: msg.value});
  });  
  socket.on('textToAll', (msg) => {
    io.emit("text", {from: socket.id, value: msg.value});
  });
  socket.on('textToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("text", {from: socket.id, value: msg.value});
  });
  
  // button 1
  socket.on('button1ToAllButMe', (msg) => {
    socket.broadcast.emit("button1", {from: socket.id});
  });  
  socket.on('button1ToAll', (msg) => {
    io.emit("button1", {from: socket.id});
  });
  socket.on('button1ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("button1", {from: socket.id});
  });
  // button 2
  socket.on('button2ToAllButMe', (msg) => {
    socket.broadcast.emit("button2", {from: socket.id});
  });  
  socket.on('button2ToAll', (msg) => {
    io.emit("button2", {from: socket.id});
  });
  socket.on('button2ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("button2", {from: socket.id});
  });
  // button 3
  socket.on('button3ToAllButMe', (msg) => {
    socket.broadcast.emit("button3", {from: socket.id});
  });  
  socket.on('button3ToAll', (msg) => {
    io.emit("button3", {from: socket.id});
  });
  socket.on('button3ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("button3", {from: socket.id});
  });
  
  // single value
  socket.on('valueToAllButMe', (msg) => {
    socket.broadcast.emit("value", {from: socket.id});
  });  
  socket.on('valueToAll', (msg) => {
    io.emit("value", {from: socket.id});
  });
  socket.on('valueToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("value", {from: socket.id});
  });
  
  
  // boolean 1
  socket.on('boolean1ToAllButMe', (msg) => {
    socket.broadcast.emit("boolean1", {from: socket.id, value: msg.value});
  });  
  socket.on('boolean1ToAll', (msg) => {
    io.emit("boolean1", {from: socket.id, value: msg.value});
  });
  socket.on('boolean1ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("boolean1", {from: socket.id, value: msg.value});
  });
  // boolean 2
  socket.on('boolean2ToAllButMe', (msg) => {
    socket.broadcast.emit("boolean2", {from: socket.id, value: msg.value});
  });  
  socket.on('boolean2ToAll', (msg) => {
    io.emit("boolean2", {from: socket.id, value: msg.value});
  });
  socket.on('boolean2ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("boolean2", {from: socket.id, value: msg.value});
  });
  // boolean 3
  socket.on('boolean3ToAllButMe', (msg) => {
    socket.broadcast.emit("boolean3", {from: socket.id, value: msg.value});
  });  
  socket.on('boolean3ToAll', (msg) => {
    io.emit("boolean3", {from: socket.id, value: msg.value});
  });
  socket.on('boolean3ToSingle', (msg) => {
    let id = msg.id;
    io.to(id).emit("boolean3", {from: socket.id, value: msg.value});
  });
  



  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id, connected);
    let idx = connected.findIndex(elm=>elm==socket.id)
    connected.splice(idx, 1);
    // console.log(connected)
    connected.forEach(id=>{
      let copy = [...connected];
      io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
    })
    
  });


});






server.listen(3000, () => {
  console.log('listening on *:3000');
});
