// select first
let range = document.getElementById("myRange");
let valueElement = document.getElementById("valueElement");


function changeHappened(){
  console.log("change happened", range.value);
  valueElement.innerHTML = range.value;
}

range.addEventListener("change", changeHappened)


function inputHapppened(){
  console.log("input happened", range.value);
  valueElement.innerHTML = range.value;
  // whenever the input to the range changes,
  // we move the whole range (sounds crazy, but
  // makes for an interesting interaction).
  // range.value will always be between 0 and 300
  // that is because we have set its maximum value to be 300
  // in the html.
  // 99 is roughly the pixel length of the slider
  // (I found out by looking into the inspector (elements tab) and by trial and error)
  // the higher the range value, the more the range
  // should move to the left, that's why the negative "-1" multiplies
  // at first.
  let newX = -1*(99/300)*range.value;
  // at last, apply the new position to the range
  range.style.left = newX + "px";
}

range.addEventListener("input", inputHapppened)
