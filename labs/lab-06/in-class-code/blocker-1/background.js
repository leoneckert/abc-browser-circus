
function replaceDogImageWithCat(details) {
  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }

  // pathname is the part after the "/",
  // e.g. http://example.com/a/b/c/dog.jpg -> pathname = "/a/b/c/dog.jpg"
  var pathname = getLocation(details.url).pathname;

  // If the pathname has the text "dog" in it, replace with our "cat.jpg"
  // Note that "cat.jpg" must be in "web_accessible_resources" in the
  // manifest.json
  if (pathname.toLowerCase().indexOf('dog') !== -1) {
    // The chrome api chrome.extension.getURL gets the absolute URL
    // to this asset (the URL will look like: chrome-extension://abcdefgh/cat.jpg
    var replacement = "https://raw.githubusercontent.com/ITPNYU/hacking-the-browser/master/request-blocking-example/cat.jpg"; //chrome.extension.getURL('cat.jpg');
    console.log(`Replacing request for ${details.url} with cat image: ${replacement}`);
    return { redirectUrl: replacement };
  }
}

function inspectRequest(details) {

  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }
  console.log(details);


}

function maybeBlockYoutube() {
  var hourOfDay = new Date().getHours(); // 0-23
  if (hourOfDay < 10) {
    console.log('Blocking youtube before noon');
    return { cancel: true };
  } else {
    console.log('Allowing youtube after noon');
  }
}

chrome.webRequest.onBeforeRequest.addListener(inspectRequest, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, []);


// This will run `replaceDogImageWithCat` for all urls that are image requests
// from the great resource that is https://github.com/ITPNYU/hacking-the-browser/blob/master/request-blocking-example/background.js
chrome.webRequest.onBeforeRequest.addListener(replaceDogImageWithCat, {
  urls: ['<all_urls>'],
  types: ['image']
}, ['blocking']);


// This will run `maybeBlockYoutube` for all reddit urls in the main frame
// from the great resource that is https://github.com/ITPNYU/hacking-the-browser/blob/master/request-blocking-example/background.js
chrome.webRequest.onBeforeRequest.addListener(maybeBlockYoutube, {
  urls: ['*://*.youtube.com/*'],     //  <-- only run for reddit urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request


// see http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}
