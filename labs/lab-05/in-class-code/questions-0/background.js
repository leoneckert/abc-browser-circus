let allQuestions = [];

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  console.log(request);
  if(request.type == "newQuestions"){
    for(let i = 0; i < request.questions.length; i++){
      if(!allQuestions.includes(request.questions[i])){
        allQuestions.push(request.questions[i])
      }
    }
    // allQuestions = allQuestions.concat(request.questions)
    console.log(allQuestions)
  }else if(request.type == "getQuestions"){
    sendResponse(allQuestions)
  }

});
