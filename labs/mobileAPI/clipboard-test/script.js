// navigator.clipboard
//   .readText()
//   .then(
//     (clipText) => (document.querySelector(".editor").innerText += clipText)
//   );


// async function getClipboardContents() {
//     try {
//       const text = await navigator.clipboard.readText();
//       console.log('Pasted content: ', text);
//     } catch (err) {
//       console.error('Failed to read clipboard contents: ', err);
//     }
//   }

// console.log("klk")

//   navigator.permissions.query({ name: "clipboard-read" }).then(function (result) {
//     if (result.state === "granted") {
//       // you can read from the clipboard
//       console.log("yea")
//     }else{
//         console.log("no")
//     }
//   });


function requestPermissions(){
  navigator.permissions.query({name:'clipboard-read'}).then((result) => {
    if (result.state === 'granted') {
      console.log("yea")
    } else if (result.state === 'prompt') {
      console.log("no")
    }
    // Don't do anything if the permission was denied.
  });
}

document.querySelector("#request").addEventListener("click", requestPermissions);