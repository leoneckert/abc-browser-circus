let socket = io();
let myId;
// document.getElementById("myId").innerText = socket.id;

socket.on("socketInfo", data=>{
    myId = data.id;
    document.getElementById("myId").innerText = data.id;
    document.getElementById("myRoom").innerText = data.roomIdx;

})


function changedColor(e){
    console.log(e.target.value);
    document.getElementById(myId).style.backgroundColor = e.target.value;

    // inform room:
    socket.emit("colorChange", e.target.value);

}
socket.on("onlineInYourRoom", inMyRoom=>{
    console.log("inMyRoom", inMyRoom)
    inMyRoom.forEach(member=>{
        let li = document.createElement("li");
        li.innerText = member.id;
        li.id = member.id;
        li.style.backgroundColor = member.color;
        if(member.id == myId){
            li.innerText += " (you)";
            let colorPicker = document.createElement("input");
            colorPicker.setAttribute("type", "color");
            colorPicker.setAttribute("value", member.color);
            colorPicker.className = "colorPicker";
            colorPicker.addEventListener("change", changedColor);
            li.appendChild(colorPicker);
        }
        document.getElementById("onlineList").appendChild(li);
    })
   
})



socket.on("newPerson", newPerson=>{
    console.log("new person!", newPerson);
    let li = document.createElement("li");
    li.id = newPerson.id;
    li.innerText = newPerson.id;
    li.style.backgroundColor = newPerson.color;
    document.getElementById("onlineList").appendChild(li);
})

socket.on("newColor", person=>{
    document.getElementById(person.id).style.backgroundColor = person.color;
})

socket.on("personLeft", id=>{
    console.log("person left!", id);
    let elm = document.getElementById(id)
    elm.parentNode.removeChild(elm);
})




