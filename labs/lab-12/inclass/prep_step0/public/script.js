let socket = io();
let myPeerID;
let myConnection = [];

//function that creates and return mouse image
function getMouseImage(){
  let img = document.createElement("img");
  img.src = "mouse.png";
  img.className = "mouse";
  document.body.appendChild(img);
  return img;
}

// create and attach my own mouse to mouse position
let myMouse = getMouseImage()


document.body.addEventListener("mousemove", function(iMovedMouse){
  // console.log(iMovedMouse);
  myMouse.style.left = iMovedMouse.clientX - 20 + "px";
  myMouse.style.top = iMovedMouse.clientY - 10 +"px";

  for(let i = 0; i< myConnection.length; i++){
    myConnection[i].connection.send({x: iMovedMouse.clientX, y: iMovedMouse.clientY});
  }

})




socket.on("welcomeToAT&T", function(welcomePack){
  // go to atnt shop sign up for new landline
  console.log("Congrats & welcome to atnt. this is your phone number.");
  console.log("wait ffor the technician to come to your house and connect you to the netwrok");
  console.log(welcomePack);

  // now we have out own phone number:
  console.log("hey technician please connect my house and this is the phone number i should have");
  myPeerID = welcomePack.yourPeerID;
  let peer = new Peer(myPeerID);




  peer.on('open', function(id) {
    // now we are ready to connect to peers
    console.log('Technician: done. you are connected. you number is: ' + id);
    console.log("who to call?");

    for(let i = 0; i < welcomePack.pleaseCall.length; i++){

      let callThisNumber = welcomePack.pleaseCall[i].peerID;
      if(callThisNumber != myPeerID){
        console.log("calling", callThisNumber);



        // calling...
        let conn = peer.connect(callThisNumber);

        /// they pick up:
        conn.on('open', function() {
          console.log("connection now open");
          // keep track of our connections
          // in this array
          // this results in the loop on line 23
          // to send our x and y location to all our connection
          myConnection.push({
            connection: conn
          })

          // create image for person we called
          let img = getMouseImage();
          // push that image around if this person send us data
          conn.on('data', function(data) {
            // console.log('Received', data);
            img.style.left = data.x - 20 + "px";
            img.style.top = data.y - 10 +"px";
          });


        });

      }
    }
  });




  // being called
  peer.on('connection', function(conn) {
    console.log("i am being connected with on the network")
    // picking up:
    conn.on('open', function() {
      console.log("connection now open");


      // keep track of all the people we are connected to
      // by collecting them in this array
      myConnection.push({
        connection: conn,
      });


      // create image for person calling us
      let img = getMouseImage();
      // if they send us data, move their image around
      conn.on('data', function(data) {
        // console.log('Received', data);
        img.style.left = data.x - 20 + "px";
        img.style.top = data.y - 10 +"px";
      });

    });
  });



})
