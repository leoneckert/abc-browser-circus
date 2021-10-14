console.log("i am a background script");
let counter = 0;

// when this script runs for the first time (or after chrome closes and restarts)
// we get the most recent count from local storage
chrome.storage.local.get(['counterInStorage'], function(result) {
  console.log("got this from storage", result);
  console.log('Value currently is ' + result.counterInStorage);
  counter = result.counterInStorage
  if(result.counterInStorage == undefined){
    counter = 0;
    chrome.storage.local.set({counterInStorage: counter}, function(){
      console.log("Saved", counter, "to local storage.")
    })
  }
});



// everytime a message from the popup script comes in:
function handleMessage(request, sender, sendResponse) {
  if(request.type == "increaseCounter"){
    // increase local counter
    counter++;
    console.log("counter in background script", counter);
    // increaser counter in local storage
    chrome.storage.local.set({counterInStorage: counter}, function(){
      console.log("Saved", counter, "to local storage.")
    })

  }else if(request.type == "getCount"){
    sendResponse(counter)
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
