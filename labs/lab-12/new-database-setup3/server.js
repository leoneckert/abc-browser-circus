const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);




const admin = require("firebase-admin");
const serviceAccount = require("./abc-2021-database-firebase-adminsdk-ur2dg-5bc1a07f84.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://abc-2021-database-default-rtdb.asia-southeast1.firebasedatabase.app"
});
// const database = getDatabase(firebaseApp);
const database = admin.database();
// Create a new rerference -- essentially a key/section on the db
// in this application we can put all our information under the same key
// check your friebase console (after pushing data for the first time)
// to understand better what this means
// from: https://firebase.google.com/docs/database/web/read-and-write
const messageListRef = database.ref('messages/');
// messageListRef.push().set("hiiii");




app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('a user connected');
  // inside here are all the listeners etc. that deal with indvidual users.

  // when the user logs on, we are getting once time only the FULL database of messages:
  messageListRef.once('value', (data) => {
    // do some stuff once
    console.log("once", data.val())
        let allData = data.val()
        socket.emit("allData", allData)
  });


  socket.on('addMessage', msg=>{
    console.log("GOT", msg);
    // lets add a timestamp before we add it to the db
    let datapoint = {
      timestamp: Date.now(),
      value: msg.value
    }
    console.log(datapoint)
    // i am using the push method of firebase. this is good for array-like data
    // data we expect a lot of infidvidual entries of. another storing method is "set"
    // push: https://firebase.google.com/docs/database/web/lists-of-data
    // set: https://firebase.google.com/docs/database/web/read-and-write
    // const newPostRef = push(messageListRef);
    // set(newPostRef, datapoint);

    messageListRef.push().set(datapoint);

  });

});


// whenever a child / datapoint is added to the db, I send it to all the clients
// note, i do this OUTSIDE of the above io.on("connection") bracket beacause
// the stuff in there happens once for every user connected
// onChildAdded(messageListRef, (data) => {
//   console.log("NEW DATAPOINT", data.val())
//   let datapoint = data.val();
//   io.emit("newMessage", datapoint);
// });

messageListRef.on('child_added', (snapshot) => {
  console.log("ONN", snapshot.val());
  let datapoint = snapshot.val();
  io.emit("newMessage", datapoint);
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});






server.listen(3000, () => {
  console.log('listening on *:3000');
});
