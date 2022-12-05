let display = document.getElementById("counterDisplay")
let button = document.getElementById("up")

let counter = 0;
button.addEventListener("click", ()=>{
    counter++;
    display.innerHTML = counter;

    // tell baclkground script that we increase da count
    // console.log("popup script: TELLING BGS about COUNT", counter);
    chrome.runtime.sendMessage({message: "count went up"});


})


// ask background for current count. 

// console.log("popup script: SENDING MESSAGE", {message: "remind me of the count"});
chrome.runtime.sendMessage({message: "remind me of the count"}, function(response) {
    // console.log("popup script: GOT RESPONSE", response);
    // console.log(response);
    // alert(response.theCount)
    display.innerHTML = response.theCount;
    counter = response.theCount;
});