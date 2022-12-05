/*
goal of this code:

a room should have a max number of people
if a person logs on their room is determined

the room allocation is dynamic.
if room0 and room1 are full, a new room2 will be created.
if then a person of room0 disconnects, 
a new person looging on will be assigned to room0 to fill the spot

in other words: if somehow possible to form groups it will always be done






*/


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static('public'));



let connected = [];
let rooms = [];
let maxPerRoom = 2;


function allocateRoomIdxFor(newPersonId){
    let roomWithSpot = rooms.findIndex(room=>{
        return room.members.length < maxPerRoom && room.members.length != 0
    })
    console.log("allocating", roomWithSpot);
    if(roomWithSpot == -1){
        let newIdx = rooms.length
        rooms.push({
            name: "room-"+newIdx,
            members: [newPersonId]
        })
        return newIdx;
    }else{
        rooms[roomWithSpot].members.push(newPersonId);
        return roomWithSpot;
    }

}
// this event will be fired when a client
// connects via socket
io.on('connection', (socket) => {
//   all we want to do with the client, we need to do in here.
    console.log('------------------------------------');
    console.log('[+] a user connected', socket.id);
    let clientObject = {
        id: socket.id,
        roomIdx: allocateRoomIdxFor(socket.id),
        color: getRandomColor()
    }
    socket.join('room-'+clientObject.roomIdx);
    socket.emit('socketInfo', clientObject);


    connected.push(clientObject);
    console.log("connected", connected)
    console.log("rooms", rooms);

    // tell socket who else is in their room
    socket.emit('onlineInYourRoom', rooms[clientObject.roomIdx].members.map(id=>connected.find(elm=>elm.id == id)));
    // tell others in their room that they have a new member
    socket.to('room-'+clientObject.roomIdx).emit("newPerson", clientObject)

    // connected.forEach(id=>{
    //     let copy = [...connected];
    //     io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
    // })

    socket.on("colorChange", newColor=>{
        console.log('------------------------------------');
        console.log("✨", socket.id, "changed their color", newColor);
        // update color in connected array
        let elm = connected.find(el=>el.id == socket.id)
        elm.color = newColor;
        console.log("connected", connected)




        // tell rest of the room about the updated color
        socket.to('room-'+clientObject.roomIdx).emit("newColor", elm)


    })




    socket.on('disconnect', () => {
        console.log('------------------------------------');
        console.log('[-] user disconnected', socket.id);
        let idx = connected.findIndex(elm=>elm.id==socket.id)
        let roomIdx = connected[idx].roomIdx;
        let memberIdx = rooms[roomIdx].members.findIndex(elm => elm==socket.id);
        rooms[roomIdx].members.splice(memberIdx, 1);
        if(rooms[roomIdx].members.length == 0 && roomIdx == rooms.length-1){
            rooms.splice(roomIdx, 1);
        }else if(rooms[roomIdx].members.length != 0){
            // let other in this room know 
            socket.to('room-'+clientObject.roomIdx).emit("personLeft", socket.id)
        }
        connected.splice(idx, 1);

        console.log("connected", connected)
        console.log("rooms", rooms);

        // // console.log(connected)
        // connected.forEach(id=>{
        //   let copy = [...connected];
        //   io.to(id).emit("updatedClients", {value: copy.filter(otherid=>otherid!=id)});
        // })
    });


});






server.listen(3000, () => {
  console.log('listening on *:3000');
});


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }