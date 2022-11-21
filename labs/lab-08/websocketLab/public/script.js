console.log("hello!")

// we can use socket io code beacue tjhe library has been included
let socket = io();

socket.on("someoneClicked", (data)=>{
    console.log("someone clicked", data)
})
document.addEventListener("click", ()=>{
    socket.emit('newClick', "clicked the dockument!");
})
document.addEventListener("keydown", ()=>{
    socket.emit('keyDown', "pressed key");
})
