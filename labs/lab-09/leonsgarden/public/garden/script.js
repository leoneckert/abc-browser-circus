console.log("garden yaya")

let lookButton = document.getElementById("look");
let giftInput = document.getElementById("gift");
let sendGift = document.getElementById("sendGift");
let garden = document.getElementById("garden");

sendGift.addEventListener("click", ()=>{
  console.log("click gift")
  let gift = giftInput.value;

  fetch("/gift?gift="+gift);

  giftInput.value = "";
})

function placeGift(gift){
  let p = document.createElement("p");
  p.innerHTML = gift;
  p.style.position = "absolute";
  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.top = Math.random() * window.innerHeight + "px";
  garden.appendChild(p);
}

function placeGifts(gifts){
  garden.innerHTML = "";
  gifts.forEach(placeGift);
}

lookButton.addEventListener("click", ()=>{
  console.log("getting gifts");
  fetch("/getGifts")
    .then(data => data.json())
    .then(data => {
      console.log("decoded:", data);
      let gifts = data.content;
      placeGifts(gifts);



    });


})
