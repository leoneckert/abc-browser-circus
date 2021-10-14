
chrome.runtime.sendMessage({type: "getQuestions"}, function(response) {
  console.log(response);
  for(let i = 0; i < response.length; i++){
    let li = document.createElement("li");
    li.innerHTML = response[i];
    document.getElementById("list").appendChild(li)
  }
});
