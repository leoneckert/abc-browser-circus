// the extension as coded in replacer-with-comments works, but
// often break websites (e.g. image links), because it is
// not very sophisticated in how it find text to replace -- it
// essentially searches the whol html markup of the page instead of only
// the text content of tags (aka text that is rendered on the page).

// to be more picky in this regard we can use a library that someone wrote
// by googling, i found https://github.com/padolsey/findAndReplaceDOMText
//
// to make use of the library we also need to inject it to the page we try to modify
// note that i included the library, the findAndReplaceDOMText.js file in the folder
// and in the manifest.json file (line 12) i specify that we want it to be injected, too
// this allows us to use its function in this script

function repl(find, replace){

  // comment out our initial, crude approach to finding and replacing text:
  // var finder = new RegExp(find,"g");
  // document.body.innerHTML = document.body.innerHTML.replace(finder, replace);

  // Here we use the library instead
  // from: https://github.com/padolsey/findAndReplaceDOMText
  findAndReplaceDOMText(document.body, {
    find: find,
    replace: replace
  })
}


function gotMessage(request, sender, sendResponse){
  console.log(request);
  repl(request.find, request.replace)
}

chrome.runtime.onMessage.addListener(gotMessage);
