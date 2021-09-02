// select first
let range = document.getElementById("myRange");
let contentElement = document.getElementById("content");

// get the html content of the content element in
// text form (the content in our case is just plain text anyway)
let text = contentElement.innerHTML;
// turning the text (string) into and array where each
// character is one element.
// split-method: https://www.w3schools.com/jsref/jsref_split.asp
let letters = text.split("");

// crate a new array, based on the letters array
// map lets us modify each element, we use it to
// "wrap" each letter in a span tag. e.g.:  "a" -> "<span>a</span>"
// at this point we are still dealing with strings, not "tags" yet
let letterSpans = letters.map((letter)=>{ return "<span>"+letter+"</span>"});

// innerHTML is cool because it takes a string which can contain tags
// and it renders it accordingly.
// to use it, we just need to turn the letterSpans array into one long
// string. we do this with the
// join-method: https://www.w3schools.com/jsref/jsref_join.asp
contentElement.innerHTML = letterSpans.join("");
// after the new tags are on the page, we select them
// so we can modify their position later on
let spanTags = contentElement.getElementsByTagName("span");

// to make the letters all move at different speeds, we will multiply
// their movement by a random value.
// to do this, we need one random value for each letter.
// we use the map method to create a new array. when using map
// the new array is always of the same length as the old one.
// we don't actually use map to "modify" each letter, but simply
// to make sure we have one random value for each.
let randomMultipliers = letters.map((letter)=>{ return Math.random()*4 })
// the new array looks something like: [1.21213, 3.1323123, 0.2342342, ...]
// and is as long as there are letters.

range.addEventListener("input", ()=>{
  // everytime the slider input changes,
  // we get its value:
  let sliderValue = range.value;
  // then we loop over each span tag (each letter)
  // to change its position
  for(let i = 0; i < spanTags.length; i+=1){
    // for each letter, we retrieve the randomly generated
    // multiplier (this is for differing speeds of the movement)
    let randomMultiplier = randomMultipliers[i];
    // then we multiply the slider value by the multiplier
    let yPos = sliderValue*randomMultiplier
    // and apply the new value to the top position
    // of the span tag. this works because we have set
    // all span elements to position: relative in style.css
    spanTags[i].style.top = yPos + "px";
  }
})
