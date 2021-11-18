let socket = io("https://luminous-good-shallot.glitch.me");
let others = []; //[id, id, id, id]
let myId;
let testMode = false;

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

// --------



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


all.addEventListener("click", function(){
  console.log("click");
  socket.emit('button1ToAll');
})

allbutme.addEventListener("click", function(){
  console.log("click");
  socket.emit('button1ToAllButMe');
})

randomSingle.addEventListener("click", function(){
  // console.log("click");
  // socket.emit('button1ToAllButMe');
  if(others.length>0){
    let ranFloat = Math.random()*others.length // 0.0...5.99
    let ranIdx = Math.floor(ranFloat) //0...1
    let randomOtherId = others[ranIdx];
    console.log(randomOtherId)
    socket.emit('button1ToSingle', {id: randomOtherId});
  }

})


socket.on('button1', function(msg) {
  if(testMode && msg.from != myId){return}
  buttonReceived();

});



// -----

// text send

let textinput = document.getElementById("textinput");
let textsubmit = document.getElementById("sendText");
let textBox = document.getElementById("textBox");

textsubmit.addEventListener("click", function(){
  let textToSend = textinput.value;
  textinput.value = '';
  if(textToSend != ''){
    socket.emit('textToAllButMe', {value: textToSend});
  }
})

// receive:
socket.on('text', function(msg) {
  if(testMode && msg.from != myId){return}  // this is the thing that ignores others in textMode

  console.log(msg.value)
  let x = Math.random()*window.innerWidth;
  let y = Math.random()*window.innerHeight;
  let p = document.createElement("p");
  p.className = "textMessage";
  p.style.left = x + "px";
  p.style.top = y + "px";
  let angle = Math.random()*360;
  p.style.transform = "rotate("+angle+"deg)";

  p.innerHTML = msg.value;
  textBox.appendChild(p);
});
