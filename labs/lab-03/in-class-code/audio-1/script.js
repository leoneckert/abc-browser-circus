// a lot of learning here: https://modernweb.com/creating-sound-with-the-web-audio-api-and-oscillators/
// and here: https://jsfiddle.net/remotesynth/73cD5/


// I removed the comments from the first step of this exercise
// find them in audio-0

let on = document.getElementById("on");
let off = document.getElementById("off");

// selecting the two new inputs
let frequencyRange = document.getElementById("frequencyInput");
let volumeRange = document.getElementById("volumeInput");

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
// we divide the value from the slider by 100 to bring it back to
// a value between 0 and 1
gain.gain.value = volumeInput.value/100;


// initializing the frequncy is more complicated
// check this example https://jsfiddle.net/remotesynth/73cD5/
// I decided that I want my frequency to range between
// 65 and 1050 Hz
let minHz = 65;
let maxHz = 1050;
// the slider give use values between 0 and 100
// if the slider gives us 0, we want the frequency to be 64,
// if the slider give us 1050, frequency is 1050
// in between we want a smooth mapping
// to translate one range to another, I usually as stackoverflow for a
// mapping function that someone else already wrote.
// I google: "map one range to another js"
// fin this page as a result: https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
// and decide to use this function someone commented:
// const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
// I wil re-write it to a more familiar look:
function map(value, x1, y1, x2, y2){
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
console.log(map(3, 0, 10, 0, 100))
// gives us 30, it answers this question:
// if i have 3 on a range from 0 to 10, what is the equivalent value on a range from 0 to 100?
// for the frequency we ask
// if I have x on a range from 0 to 100 (the value range the input slide gives us),
// what is the equivalent on a range from 65 (minHz) to 1050 (maxHz);
let sliderValue = frequencyRange.value;
let mappedHertz = map(sliderValue, 0, 100, minHz, maxHz);
console.log("mapped hertz is", mappedHertz)
oscillator.frequency.value = mappedHertz;

// Great, we have set the initial values for volume and frequency
// let's quickly change on line in the on button function below:


// on button click event
on.addEventListener("click", ()=>{
  if(!oscillatorStarted){
    oscillator.start(0);
    oscillatorStarted = true;
  }

  // instead of setting full volume:
  // gain.gain.value = 1;
  // let us stay true to the volume slider:
  gain.gain.value = volumeInput.value/100;

});

off.addEventListener("click", ()=>{
  gain.gain.value = 0;
});


// lastly we need to define what should happen when we use the sliders!
volumeRange.addEventListener("input", ()=>{
  gain.gain.value = volumeInput.value/100;
})
frequencyRange.addEventListener("input", ()=>{
  // sliderValue = frequencyRange.value;
  // mappedHertz = map(sliderValue, 0, 100, minHz, maxHz);
  // console.log("mapped hertz is", mappedHertz)
  // oscillator.frequency.value = mappedHertz;
  // or, shorter:
  oscillator.frequency.value = map(frequencyRange.value, 0, 100, minHz, maxHz);
})
