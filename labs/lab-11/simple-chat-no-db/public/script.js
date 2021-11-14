let socket = io();
let messagebox = document.getElementById("messagebox")
let sendbutton = document.getElementById("send")
let chat = document.getElementById("chat")
let usercount = document.getElementById("usercount")

sendbutton.addEventListener("click", ()=>{
  let text = messagebox.value.trim();
  if(text!=""){
    // console.log("message", text)
    let data = {content: text};
    socket.emit('message-from-one', data);
    messagebox.value = ""
  }
})

function appendMessage(message){
  let text = message.content;
  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = text;
  li.appendChild(p);

  // make sure the new messages appear on top of the previous ones:
  // from: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend
  chat.prepend(li);
  chat.scrollTop = 0;

}

function updateUserCount(data){
  let count = data.count;
  usercount.innerHTML = count-1; // minus 1 because because that 1 is us :)

}

socket.on('message-to-all', (data)=>{
  console.log("a new message arrived", data)
  appendMessage(data);

})

socket.on('new-user-count', (data)=>{
  updateUserCount(data);
})


// listen for a message that sends all the archival data
// then render each message using a loop and the appendMessage() function.
socket.on('archival-data', (data)=>{

  let keys = Object.keys(data);

  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let datapoint = data[key];
    appendMessage(datapoint)
  }
  
})




// from: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Execute a function when the user releases a key on the keyboard
messagebox.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    sendbutton.click();
  }
});
