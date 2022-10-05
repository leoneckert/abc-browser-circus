/*
related:
https://web.dev/native-hardware-device-orientation/
https live server: https://medium.com/webisora/how-to-enable-https-on-live-server-visual-studio-code-5659fbc5542c
https://gist.github.com/prof3ssorSt3v3/edb2632a362b3731274cfab84e9973f9
https://discussions.apple.com/thread/253667401#:~:text=Open%20settings%20and%20use%20the,all%20roots%20for%20that%20profile.

https://www.w3.org/TR/orientation-event/#dom-deviceorientationevent-requestpermission
*/

// let button = document.getElementById("button")
// button.addEventListener("click", ()=>{
//         document.getElementById('doeSupported').innerText = 'nah no';
//         // document.getElementById('doeSupported').innerText = window.DeviceOrientationEvent;

//     setTimeout(()=>{
//         if (window.DeviceOrientationEvent) {
//             window.addEventListener('deviceorientation', deviceOrientationHandler, false);
//             document.getElementById('doeSupported').innerText = 'Yes!!';
//         }else{
//             document.getElementById('doeSupported').innerText = 'still no';

//         }
//     }, 2000)
// })


let on = document.getElementById("on");
let off = document.getElementById("off");

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

let minHz = 65;
let maxHz = 1050;
let midHz = (minHz + maxHz)/2;
function map(value, x1, y1, x2, y2){
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
  }

let mappedHertz = map(1, 0, 100, minHz, maxHz);
console.log("mapped hertz is", mappedHertz)
oscillator.frequency.value = mappedHertz;

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

volumeRange.addEventListener("input", ()=>{
    gain.gain.value = volumeInput.value/100;
  })





let btn = document.getElementById("button")

// if ( location.protocol != "https:" ) {
//     location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }
function permission () {
    document.getElementById('doeSupported').innerText = 'asking';
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                document.getElementById('doeSupported').innerText = 'Yes!!';

                window.addEventListener('deviceorientation', (event) => {
                    document.getElementById("alpha").innerHTML = event.alpha;
                    document.getElementById("beta").innerHTML = event.beta;
                    document.getElementById("gamma").innerHTML = event.gamma;

                    oscillator.frequency.value = map(event.gamma, -90, 90, minHz, maxHz);

                });
                window.addEventListener('devicemotion', (event) => {
                    // console.log(`${event.acceleration.x} m/s2`);
                    document.getElementById("acc_x").innerHTML = event.acceleration.x;
                    document.getElementById("acc_y").innerHTML = event.acceleration.y;


                });
            }
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
        document.getElementById('doeSupported').innerText = 'still no';
    }
}
btn.addEventListener( "click", permission );