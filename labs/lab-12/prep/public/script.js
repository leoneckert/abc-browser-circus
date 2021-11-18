let socket = io();

let peer;
let myID = uuid();

let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

peer = new Peer(myID);
peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  socket.emit("signup", myID);
});

socket.on("call", msg=>{
  console.log(msg)

    getUserMedia({video: true, audio: true}, function(stream) {

      for(let i = 0; i < msg.length; i++){
        console.log("calling", msg[i].peerID)
        var call = peer.call(msg.peerID, stream);
        call.on('stream', function(remoteStream) {

          // Show stream in some video/canvas element.
          let v = document.createElement("video");
          v.srcObject=remoteStream;

          document.body.appendChild(v);
        });
      }

    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });

})


  peer.on('call', function(call) {
    console.log("got called!")

    getUserMedia({video: true, audio: true}, function(stream) {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        let v = document.createElement("video");
        v.srcObject=remoteStream
        document.body.appendChild(v);
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
  });


//
//
//
// socket.on("peerID", msg=>{
//   console.log("my Peer id", msg);
//
//
//
//
//
//
//
// })


// socket.on("peerID", msg=>{
//   console.log(msg)
//   let peer = new Peer(msg);
//   var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//
//   socket.on("call", (msg)=>{
//     console.log(msg);
//     // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     getUserMedia({video: true, audio: true}, function(stream) {
//
//       for(let i = 0; i < msg.length; i++){
//         var call = peer.call(msg.peerID, stream);
//         call.on('stream', function(remoteStream) {
//
//           // Show stream in some video/canvas element.
//           let v = document.createElement("video");
//           v.srcObject=remoteStream;
//
//           document.body.appendChild(v);
//         });
//       }
//
//     }, function(err) {
//       console.log('Failed to get local stream' ,err);
//     });
//   })
//
//
//   peer.on('call', function(call) {
//     console.log("got called!")
//
//     getUserMedia({video: true, audio: true}, function(stream) {
//       call.answer(stream); // Answer the call with an A/V stream.
//       call.on('stream', function(remoteStream) {
//         // Show stream in some video/canvas element.
//         let v = document.createElement("video");
//         v.srcObject=remoteStream
//         document.body.appendChild(v);
//       });
//     }, function(err) {
//       console.log('Failed to get local stream' ,err);
//     });
//   });
//
//
// })

// create unique id
// from: https://www.codegrepper.com/code-examples/javascript/javascript+generate+unique+key
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
