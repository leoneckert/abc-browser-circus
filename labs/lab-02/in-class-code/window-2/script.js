// select two buttons
let button = document.getElementById("button");
let enough = document.getElementById("enough");

enough.style.display = "none";

// getting the dimension of the screen (not the browser window, the whole screen!)
// from: https://www.w3schools.com/jsref/prop_screen_width.asp
let sw = screen.width;
let sh = screen.height;

// function for stars coming from the left
function leftStar(){
  // generate a random y location for the shooting star
  let ranY = Math.random()*sh - 200;
  // its starting location is 0
  let x = 0;
  // open the window the same way as in the
  // window-1 coding example of this Lab
  let win = window.open("left", "_blank", "width=250, height=130, left="+x+", top="+ranY);

  // using this eventlistener we can make sure
  // the window we just opened loads all its content
  // only when  the image of the shooting star
  // is rendered, the "load" event will trigger
  // and out function inside it will be executed
  win.addEventListener("load", ()=>{

    // after the iage of the star is rendered,
    // we create an interval to move the star from left to right
    // we save the interval ina variable
    // so that we can letter stop (clear) the interval
    // be aware of scope here, we create this variable
    // for every star window, but because it happens inside this function,
    // (its nested in two functions in fact), the variables don't affect
    // on another
    let interval = setInterval(()=>{

      // increasing the value of x in every interval
      x+=40;

      if(x > sw-300){
        // if the star has moved all the way to the right,
        // we stop this interval (important!)
        clearInterval(interval);
        // and close the star window
        win.close();
      }else{
        // if the window has not yet reached the right side
        // we use the window.moveTo() method to move it to its
        // new x locations, but keep the y location the same (ranY)
        // reference: https://www.w3schools.com/jsref/met_win_moveto.asp
        win.moveTo(x, ranY);
      }
      // the second argument in the setInterval function is the amount
      // of milliseconds before the next time the code runs
    }, 50)
  })
}

// almost identical function for stars coming from the left
// understand the details by looking though the comments in the above function
function rightStar(){
  let ranY = Math.random()*sh - 200;
  // different starting x, at the right edge of the screen
  let x = sw-200;
  let win = window.open("right", "_blank", "width=250, height=130, left="+x+", top="+ranY);

  win.addEventListener("load", ()=>{
    let interval = setInterval(()=>{
      // we decrease x since this star move from right to left
      x-=40;
      // the if condition is testing whether the star
      // reach the left edge of the screen
      if(x < 300){
        clearInterval(interval);
        win.close();
      }else{
        win.moveTo(x, ranY);
      }
    }, 50)
  })
}

// we declare the interval variable for the shooting stars interval
// here, as a "global" variable in order to be able to
// use it in both of the functions below
let inter;

function shootingStars(){
  // when shooting stars start,
  // we hide the star button
  // and show the stop button
  button.style.display = "none";
  enough.style.display = "block";

  // then we start the interval and
  // save it to the global "inter" variable
  // in the stop() function below
  // we can refer to "inter" and clear the interval
  inter = setInterval(()=>{
    // this is just fine tuning of how regular
    // shooting stars should appear.
    // since they are shooting stars we
    // want them to appear irregularly.
    // the use of ran here and the time (200)
    // below for the interval are subject to fine-tuning
    let ran = Math.random();
    if(ran<0.025){
      leftStar();
    }else if (ran<0.05) {
      rightStar();

    }
  },200);



}


function stop(){
  // clear the interval and show star button / hide stop button
  clearInterval(inter);
  button.style.display = "block";
  enough.style.display = "none";
}

// add listeners, done!
button.addEventListener("click", shootingStars);
enough.addEventListener("click", stop);
