// a lot of learning here: https://modernweb.com/creating-sound-with-the-web-audio-api-and-oscillators/
// and here: https://jsfiddle.net/remotesynth/73cD5/

let on = document.getElementById("on");
let off = document.getElementById("off");


let context = new AudioContext();
// context is like a sound toolbox, giving us various things to play with
let destination = context.destination;
// any sound we create needs to end up at the "destination"
// we can think of it a little bit like an amplifier,
// the last node in a chain of sound tools, the amplifier
// ultimately makes the sounds audible:

//                  Sound
//                    ^
//                    |
//                    |
// +-----------+      |
// |           |------+
// | Amplifier |
// +-----------+

let oscillator = context.createOscillator();
// oscillators, in music, are elextornic circuits producing a wave-form electronic signal
// if the signal's frequency is between 16Hz and 20 kHz, the signal is audible
// more info: https://en.wikipedia.org/wiki/Electronic_oscillator
//
// we can think of it as the origin of the sound we work with
// +------------+
// | Oscillator |
// +------------+
//
// we can also define the type of wave (different waves produce different sounds)
oscillator.type = "triangle"; // "sine" is default type
// and the frequency of the oscillator,
// different frequences can be used to generated different
// music notes (see example linked on top):
oscillator.frequency.value = 440; // defined in Hz (Hertz), 440 is default.


let gain = context.createGain();
// the gain defines the overall volume
// we can think of it like a volume knob on a sound machine:

// +------+
// |      |
// |Volume|
// +------+


// now we need to chain connect our components together:
oscillator.connect(gain);
//
//                      +------+
// +------------+       |      |
// | Oscillator |------>|Volume|
// +------------+       +------+

gain.connect(destination);
//
//                                                         Sound
//                                                           ^
//                                                           |
//                                                           |
//                      +------+          +-----------+      |
// +------------+       |      |--------->|           |------+
// | Oscillator |------>+Volume|          | Amplifier |
// +------------+       +------+          +-----------+


// In Javascript, an oscialltor
// can only be started once,
// if you stop it, it's over...
// that said you can start as many different
// oscialltors as you like
// Below we will switch on/off our osicalltor
// by using the volume/gain alone
// to make sure we only start it once,
// this boolean variable will help:
let oscillatorStarted = false;

// on button click event
on.addEventListener("click", ()=>{
  // if it's the first time we click,
  // the if statement will run...
  if(!oscillatorStarted){
    // ...and start the oscillator to produce its wave
    oscillator.start(0);
    // setting the variable to true
    // makes sure that the next time the button is clicked,
    // we don't try to start the oscillator again;
    // we would get an error message if we tried.
    oscillatorStarted = true;
  }

  // setting the volume/gain to maximum: 1
  gain.gain.value = 1;

});

// off button click event
off.addEventListener("click", ()=>{
  // setting the volume/gain to minimum: 0
  gain.gain.value = 0;
});
