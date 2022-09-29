let button = document.getElementById("button");
let box1 = document.getElementById("one");
let box1Angle = 0;
let buttonAngle = 0;


button.addEventListener("click", () => {
  console.log("click");
  box1Angle += 360;
  box1.style.transform = "rotate("+box1Angle+"deg)";
})

box1.addEventListener("click", () => {
  console.log("click");
  buttonAngle += 360;
  button.style.transform = "rotate("+buttonAngle+"deg)";
})
