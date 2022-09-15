// select first
let range = document.getElementById("myRange");
let valueElement = document.getElementById("valueElement");


// initially we set out to find the difference between
// the two events "change" and "input".
// "change" fires when we make a decision where to leave
// the range slider -- when we let go of it.
// "input" fires constantly while we slide along it.
// I commented out the "change" part below, because it
// is not needed for the behaviour we aim for.
// You can comment it back in and see the console logs
// to understand what is does different
// to the "input" event listener below

// function changeHappened(){
//   console.log("change happened", range.value);
//   valueElement.innerHTML = range.value;
// }
//
// range.addEventListener("change", changeHappened)

// input event listener

function inputHapppened(){
  console.log("input happened", range.value);
  valueElement.innerHTML = range.value;
  // using the "left" attribute to move the span tag
  // works because its position is set to "relative"
  // in the style.css file
  valueElement.style.left = range.value + "px";
}

range.addEventListener("input", inputHapppened)
