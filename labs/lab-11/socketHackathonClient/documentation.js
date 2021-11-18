let socket = io("https://abc-socket-hackathon.glitch.me");
let others = [];
let myId;
let testMode = true;


//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});


// text methods:
// send:

socket.emit('textToAllButMe', {value: "hello"});
socket.emit('textToAll', {value: "hello"});
if(others.length>0){
  socket.emit('textToSingle', {id: others[0], value: "hello"});
}

// receive:
socket.on('text', function(msg) {
  if(testMode && msg.from != myId){return}
  console.log(msg.value)
});


// button (three button channels exist: button1, button2, button3)
// send:

socket.emit('button1ToAllButMe');
socket.emit('button1ToAll');
if(others.length>0){
  socket.emit('button1ToSingle', {id: others[0]});
}

// receive:
socket.on('button1', function(msg) {
  if(testMode && msg.from != myId){return}
  console.log(msg)
});



// single value
// send:

socket.emit('valueToAllButMe', {value: 1);
socket.emit('valueToAll', {value: 1);
if(others.length>0){
  socket.emit('valueToSingle', {id: others[0], value: 1});
}

// receive:
socket.on('value', function(msg) {
  if(testMode && msg.from != myId){return}
  console.log(msg.value)
});


// boolean (three boolean channels exist: boolean1, boolean2, boolean3)
// send:

socket.emit('booleanToAllButMe', {value: true);
socket.emit('booleanToAll', {value: true);
if(others.length>0){
  socket.emit('booleanToSingle', {id: others[0], value: true});
}

// receive:
socket.on('boolean', function(msg) {
  if(testMode && msg.from != myId){return}
  console.log(msg.value)
});
