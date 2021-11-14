let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);


let firebase = require('firebase');

let firebaseConfig = {
    apiKey: "AIzaSyAz9O-jC1DUK4U2-Otz0GyZYuZMQZavlgM",
    authDomain: "abc-chat-tutorial.firebaseapp.com",
    databaseURL: "https://abc-chat-tutorial.firebaseio.com",
    projectId: "abc-chat-tutorial",
    storageBucket: "abc-chat-tutorial.appspot.com",
    messagingSenderId: "569722030377",
    appId: "1:569722030377:web:1d29777f1c68554b3ccf38"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
let database = firebaseApp.database();

// Create a new post reference with an auto-generated id
var messageListRef = database.ref('messages');




let userCount = 0;
app.use(express.static('public'))


io.on('connection', (socket) => {

  // get all archival messages from the database as send them to
  // the person that just connected


  messageListRef.once('value').then((snapshot) => {
    // console.log(snapshot.val());
    let archivalData = snapshot.val();
    socket.emit('archival-data', archivalData);

  });




  console.log('a user connected');
  userCount += 1;
  io.emit('new-user-count', {count: userCount});


  socket.on('message-from-one', (data) => {
    // save this message to the database
    messageListRef.push(data);

    io.emit('message-to-all', data);
  });



  socket.on('disconnect', () => {
    console.log('user disconnected');
    userCount -= 1;
    io.emit('new-user-count', {count: userCount});
  });




});






http.listen(3000, () => {
  console.log('listening on *:3000');
});
