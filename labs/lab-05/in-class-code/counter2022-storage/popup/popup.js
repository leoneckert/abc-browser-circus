let display = document.getElementById("counterDisplay")
let button = document.getElementById("up")

let counter = 0;
button.addEventListener("click", ()=>{
    counter++;
    display.innerHTML = counter;

    // set new count in storage
    chrome.storage.local.set({myCount: counter}, ()=>{
        console.log("success! local storage stored", counter);
    })
})


//when popup load, ask storage for current count
chrome.storage.local.get(['myCount'], function(result) {
    console.log('Value currently is ' + result.myCount);
    

    if(result.myCount == undefined){
        // if myCount has never been defined:
        counter = 0;
        // ..then we initliaze it to 0
        chrome.storage.local.set({myCount: counter}, ()=>{
            console.log("success! local storage stored", counter);
        })
    }else{
        // if myCount has been defined we use it to adjust the  
        // variable counter and disay it on the popup window
        counter = result.myCount;
        display.innerHTML = counterme;
    }
});

