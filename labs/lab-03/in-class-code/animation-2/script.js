// create some boxes
for(let i = 0; i < 10; i++){
  let box = document.createElement("div");
  // important to assign the className
  // this way the CSS we defined applies to the element
  box.className = "moveBox";
  // give it a random start position
  let ranX = Math.random()*(window.innerWidth-50);
  let ranY = Math.random()*(window.innerHeight-50);
  // use the translate property to position them
  box.style.transform = "translate("+ranX+"px, "+ranY+"px)";
  // append them to the body/page
  document.body.appendChild(box)
}

// i select them all here once, so I don't have to do
// it in every interval
// this works because the number of boxes stays the same
// in this example
let moveBoxes = document.getElementsByClassName("moveBox");


setInterval(()=>{
  // loop over the boxes
  for(let i = 0; i<moveBoxes.length; i++){
    // pick a new random position
    // 50 is the width and height of the box
    let ranX = Math.random()*(window.innerWidth-50);
    let ranY = Math.random()*(window.innerHeight-50);
    // chnage the transform property
    // the change will be animated within 2 seconds thanks to our CSS
    moveBoxes[i].style.transform = "translate("+ranX+"px, "+ranY+"px)";
  }
}, 2000); // picks a new location for the boxes every two seconds


// set interval only starts after 2 seconds
// I use this timeout (of 0 seconds) to make the boxes move
// right in the beginning when we open the website
setTimeout(()=>{
  for(let i = 0; i<moveBoxes.length; i++){
    let ranX = Math.random()*(window.innerWidth-50);
    let ranY = Math.random()*(window.innerHeight-50);
    moveBoxes[i].style.transform = "translate("+ranX+"px, "+ranY+"px)";
  }
}, 0)
