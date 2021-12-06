let button = document.getElementById("submit");
let textInput = document.getElementById("textinput");
let messageBoard = document.getElementById("messageBoard");
let socket = io();



button.addEventListener("click", event=>{
  console.log(textInput.value);
  // note, i am sending data to the server, but don't put the
  // message onto the page. instead i wait for the server to receive it
  // send it to the database, the data base to trigger its addedChild event
  // and then the server to send it back to me (and any other client)
  // this way. if my message appears on the messageboard, i can be sure everyone else
  // sees it too.
  socket.emit("addMessage", {value: textInput.value})
  textInput.value = "";

})

function createEntry(datapoint){
  console.log("creating", datapoint);
  let p = document.createElement("p");
  p.className = "entry";
  p.innerText = datapoint.value;
  messageBoard.prepend(p);

}

socket.on("allData", data=>{
  console.log("got all data", data)
  // turn into array:
  data = Object.keys(data).map(key=>data[key])
  data.forEach(createEntry)
})

socket.on("newMessage", datapoint=>{
  console.log("got new message", datapoint)
  createEntry(datapoint)
})








// so we can hit enter instead of hitting the submit button
window.addEventListener("keydown", event=>{
  if(event.key == "Enter"){
    button.click();
  }
})
