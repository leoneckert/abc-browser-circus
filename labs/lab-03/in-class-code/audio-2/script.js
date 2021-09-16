// a lot of learning here: https://modernweb.com/creating-sound-with-the-web-audio-api-and-oscillators/
// and here: https://jsfiddle.net/remotesynth/73cD5/


// I removed the comments from the first and second step of this exercise
// find them in audio-0 and audio-1

let on = document.getElementById("on");
let off = document.getElementById("off");

// the inputs don't exist anymore so we don't need to select
// them. comment or delete these two line:
// let frequencyRange = document.getElementById("frequencyInput");
// let volumeRange = document.getElementById("volumeInput");

let context = new AudioContext();
let destination = context.destination;

let oscillator = context.createOscillator();
oscillator.type = "triangle";
oscillator.frequency.value = 440;

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(destination);

let oscillatorStarted = false;

// initialise the volume:
// we want to control the volume through the browser position.
// browser all the way to the left of our screen should mean 0 (silence)
// browser all the way to the right of our screen should mean 1 (loud)
// ...but how to get the browser position?
// i found help here: https://developer.mozilla.org/en-US/docs/Web/API/Window/screenX
let screenWidth = screen.width;
let browserX = window.screenX; // (from above link)
// we also want the window's width because we want the volume to be
// maximum when the RIGHT edge of the browser touches the right edge of the screen
let browserWidth = window.innerWidth;
// map the two ranges, we can use the map function from the prvious step again.
// I'll declare it here (instead of further below where it used to be):
function map(value, x1, y1, x2, y2){
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
// now the volume is:
let volume = map(browserX, 0, screenWidth-browserWidth, 0, 1);
// let's initialize:
gain.gain.value = volume;


// initializing the frequncy
// in the last step, we identified our frequency range:
let minHz = 65;
let maxHz = 1050;
// what is our browser size range? If you developer tools
// are open and you resize your browser, you can see the dimensions of
// the window in the corner. try it and decide at which points
// you want the minimum size to be (ie the point at which the lowes sound should be heard)
// and at which point your the maximum sound be heard?
// since we are dealing with two values (widht and height),
// we could multiplye them for a surface area value
// my browser seems pretty small at 300px x 300px
let minBrowserSurface = 90000; // (that is 300*300)
// and it's pretty large at 900px * 600px
let maxBrowserSurface = 540000; // (900*600)
// now we can map the frequency!
let currentBrowserSurface = window.innerWidth * window.innerHeight;
let frequency = map(currentBrowserSurface, minBrowserSurface, maxBrowserSurface, minHz, maxHz);
console.log(frequency);
// resize and refresh your window a few times.
// you will see that the values end up being lower or higher than minHz and maxHz
// ...that's because the map function maps values outside of the range, too
// to "cap" our value, we can:
if(frequency > maxHz){
  frequency = maxHz;
}else if(frequency < minHz){
  frequency = minHz;
}
// lastly lets initialize the frequency:
oscillator.frequency.value = frequency;


// Nice,
// lets again adapt the valume in the "on" button:


// on button click event
on.addEventListener("click", ()=>{
  if(!oscillatorStarted){
    oscillator.start(0);
    oscillatorStarted = true;
  }

  // we calculate volume based on the browser position
  gain.gain.value = map(window.screenX, 0, screenWidth-window.innerWidth, 0, 1);

});

off.addEventListener("click", ()=>{
  gain.gain.value = 0;
});



// and now we need to adapt both volume and frequency if the browser size or position
// changes.

// lets start with the frequency
// after googling "detect window resize JS"
// I find this: https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
// good news! there is an eventListner for window resizing:
window.addEventListener("resize", ()=>{
  let newWindowSurface = window.innerWidth * window.innerHeight;
  // mapping using the variables created before
  let newFrequency = map(newWindowSurface, minBrowserSurface, maxBrowserSurface, minHz, maxHz);
  // capping the value
  if(newFrequency > maxHz){
    newFrequency = maxHz;
  }else if(newFrequency < minHz){
    newFrequency = minHz;
  }
  // ...aaaaand use it:
  oscillator.frequency.value = newFrequency;

  // watch out, sometimes rezizing the window, also changes the x position of it on the screen
  // (that's the case when we resize the window from the left)
  // so we should play it safe and also adjust the volume here:
  gain.gain.value = map(window.screenX, 0, screenWidth-window.innerWidth, 0, 1);

})

// final item!
// we need to detect when the window has been moved around
// bad news: there is no event listener that does that!
// amazing (but old) news: that ain't no problem because we
// can use the tools we have to detect the move anyway :)

// we know that we can get the windows position like above, using window.screenX
// we can just regularly check this value and if it changed that means the window was moved:

// we store the current position
let prevWindowX = window.screenX;

// now we check periodically (quite often) in a setInterval function:
setInterval(()=>{
  if(prevWindowX != window.screenX){
    // console.log('the window moved on the x axis!');
    // if the window moved, we adjust the volume like before:
    gain.gain.value = map(window.screenX, 0, screenWidth-window.innerWidth, 0, 1);

  }

  prevWindowX = window.screenX
}, 50); //check every 50 milliseconds!
