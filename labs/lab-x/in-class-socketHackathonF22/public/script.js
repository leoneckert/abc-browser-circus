// let socket = io();
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


let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let buttonOutput = document.getElementById("buttonOutput");

function buttonReceived(){
  buttonOutput.style.backgroundColor = "red";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "black";
  }, 500)
}

// // when clicking the all but me button
// // tell the server that we did:
// allbutme.addEventListener("click", ()=>{
//   // tell socket server
//   socket.emit("button1ToAllButMe")
// })

// // if I receive that someone pressed button 1:
// socket.on("button1", ()=>{
//   document.body.style.backgroundColor = "coral";
// })


// BOOLEAN 1 
// get checkbox:
let boolean1In = document.getElementById("boolean1");
// check for event of changing checkbox
boolean1In.addEventListener("change", ()=>{
  let state = boolean1In.checked;
  // send event and checkbox value to server
  socket.emit("boolean1ToAllButMe", {value: state});
})

// if others check their box, i will get notified by the server:
socket.on("boolean1", (msg)=>{
  console.log(msg);
  // if i get a 'true'/'checked' message, turn the website upside down
  if(msg.value == true){
    document.getElementById("textOverlay").style.transform = "rotate(180deg)";
  }else{
    // else, turn it back again
    document.getElementById("textOverlay").style.transform = "rotate(0deg)";

  }
})

// text input
let textInputBox = document.getElementById("textInput");

document.body.addEventListener("keypress", (event)=>{
  // console.log(event.key)
  if(event.key == "Enter" && textInputBox.value != ""){
    // console.log(textInputBox.value);
    socket.emit("textToAllButMe", {value: textInputBox.value});

    textInputBox.value = "";
  }
})

socket.on("text", (msg)=>{
  let p = document.createElement("p");
  p.innerText = msg.value;
  document.getElementById("textOut").appendChild(p)

  document.getElementById("textOverlay").scrollTop = document.getElementById("textOverlay").scrollHeight;
})

function getRandomSocketIDthatIsAlsoConnected(){
  let ranIDX = Math.floor(Math.random()*others.length);
  return others[ranIDX];
}