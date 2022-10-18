// https://developer.chrome.com/extensions/messaging




let findWord = document.getElementById("findword");
let replaceWord = document.getElementById("replaceword");
let button = document.getElementById("replaceButton");


button.addEventListener("click", ()=>{

  let wordToSearchFor = findWord.value;
  let wordToUseInstead = replaceWord.value;


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = {
      find: wordToSearchFor,
      replace: wordToUseInstead
    }

    chrome.tabs.sendMessage(tabs[0].id, message);
  });
})
