const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


// sort of a "socket.io route"
// if someone connects, this event listener 
// detects that connection:
io.on('connection', (socket) => {

    // how to deal with individual client

    console.log('a user connected', socket.id);


    // if this client (socket) send a message to me (the server)
    socket.on('newClick', (msg) => {
        console.log('client ' + socket.id + ' pressed the doc ' + msg);
        // // send something all other clients (including sender)
        // io.emit("someoneClicked", msg);
        // send to all except sender
        socket.broadcast.emit("someoneClicked", msg);
    });

    socket.on('keyDown', (msg) => {
        console.log('client ' + socket.id + ' pressed a key');
        // socket.broadcast.emit("someoneClicked", msg);
    });


 
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });



});





server.listen(3000, () => {
  console.log('listening on *:3000');
});