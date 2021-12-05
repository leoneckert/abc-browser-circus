// contrary to before, we do not use the "require..." syntax in this file
// instead we are using a newer way to "import" modules.
// in order for it to work, you need to designate this project
// "type": "module",
// in your package.json file. for reference see the package.json in this folder.
import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";

// the following is good practise.
// sensitive infomration can be written into a separate file (e.g. "credentials.js")
// from there it is exported, and in this file we import it.
// then, when uoloaing your code to github you can exclude that file.
// in the root of your repo you will see a file called ".gitignore"
// anything listed in that file will be excluded when pushing things to Github.
// go ahead and write "credentials.js" into the ".gitignore" file.
// I will upload a "credentials-template.js" file to github so you can see what
// the file should look like. rename it to "credentials.js" before you use it.
import { credentials } from './credentials.js'
console.log(credentials)

// // import firebase library:
import { initializeApp } from "firebase/app";
// we are important various firebase methods we will be using
// i import a lot of methods
// recommending:
// "Read and Write Data" (https://firebase.google.com/docs/database/web/read-and-write)
// and "Work with Lists of Data" (https://firebase.google.com/docs/database/web/lists-of-data)
import { getDatabase, get, ref, set, push, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = credentials;
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
// Create a new rerference -- essentially a key/section on the db
// in this application we can put all our information under the same key
// check your friebase console (after pushing data for the first time)
// to understand better what this means
// from: https://firebase.google.com/docs/database/web/read-and-write
const messageListRef = ref(database, 'messages/');



// use a pub;lic folder to serve static files
app.use(express.static('public'))


const io = new Server(server);



io.on('connection', (socket) => {
  console.log('a user connected');
  // inside here are all the listeners etc. that deal with indvidual users.

  // when the user logs on, we are getting once time only the FULL database of messages:
  get(messageListRef).then((snapshot) => {
    if (snapshot.exists()) {
      let allData = snapshot.val()
      socket.emit("allData", allData)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });


  socket.on('addMessage', msg=>{
    console.log(msg);
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
    const newPostRef = push(messageListRef);
    set(newPostRef, datapoint);

  });

});


// whenever a child / datapoint is added to the db, I send it to all the clients
// note, i do this OUTSIDE of the above io.on("connection") bracket beacause
// the stuff in there happens once for every user connected
onChildAdded(messageListRef, (data) => {
  console.log("NEW DATAPOINT", data.val())
  let datapoint = data.val();
  io.emit("newMessage", datapoint);
});






server.listen(3000, () => {
  console.log('listening on *:3000');
});


//
//
//
//
//
// import { createServer } from "http";
// import { Server } from "socket.io";
//
// const httpServer = createServer();
// const io = new Server(httpServer, {
//   // ...
// });
//
// io.on("connection", (socket) => {
//   // ...
// });
//
// httpServer.listen(3000);
