/*
related:
https://web.dev/native-hardware-device-orientation/
https live server: https://medium.com/webisora/how-to-enable-https-on-live-server-visual-studio-code-5659fbc5542c
https://gist.github.com/prof3ssorSt3v3/edb2632a362b3731274cfab84e9973f9
https://discussions.apple.com/thread/253667401#:~:text=Open%20settings%20and%20use%20the,all%20roots%20for%20that%20profile.

to instrallc ertificate, download it and then go to Settings>VPN & Device Management, certificate should show up there

make it work on chrome (computer): chrome://flags/#allow-insecure-localhost

windows:
installed open https://tecadmin.net/install-openssl-on-windows/
then we followed first step of this: https://gist.github.com/prof3ssorSt3v3/edb2632a362b3731274cfab84e9973f9
for second steo we had to add flag -config PATHTOCONFIGFILE

rest was the same


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

// let btn = document.getElementById("button")

// if ( location.protocol != "https:" ) {
//     location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }
function askPermission () {
    // document.getElementById('doeSupported').innerText = 'asking';
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {

                window.addEventListener('deviceorientation', (event) => {
                    handleGyro(event);
                });
            }
        })
            .catch( console.error )
    } else {
        alert( "I tried everything. it doesn't work :(" );
    }
}

// permission()

// btn.addEventListener( "click", permission );

function handleGyro(event){
    document.getElementById("buttonContainer").innerHTML("")
    document.getElementById("alpha").innerHTML = event.alpha;
    document.getElementById("beta").innerHTML = event.beta;
    document.getElementById("gamma").innerHTML = event.gamma;
}

function accesGyroOrAsk(){
    try {
        window.addEventListener('deviceorientation', (event) => {
            handleGyro(event);
        });
    } catch (e) {
        //if just accessing gyroscope doesn't work after button click, we formally ask for permission
        askPermission();
    }
}


// just acces gyroscope

window.addEventListener('deviceorientation', (event) => {
    handleGyro(event);
});
//if just accessing gyroscope doesn't work, we try first clicking a button:
let button = document.createElement("button")
button.innerHTML("access gyro or ask for permission")
button.addEventListener("click", accesGyroOrAsk)
document.getElementById("buttonContainer").appendChild(button)

