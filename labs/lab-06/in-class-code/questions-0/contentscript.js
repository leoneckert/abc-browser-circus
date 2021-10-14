const regex = /\b[^.]+?\?/g;

function searchQuestions(){
  let text = document.body.textContent;
  const found = text.match(regex);
  let questionWords = ["How", "What", "Where", "Why", "Who"];
  function starts(sentence){
    for(let i = 0; i< questionWords.length; i++){
      if(sentence.startsWith(questionWords[i]) || sentence.startsWith(questionWords[i].toLowerCase())  ){
        return true
      }
    }
  }
  let questions = found.filter( s=>starts(s) )

  chrome.runtime.sendMessage({type: "newQuestions", questions: questions})

}

window.addEventListener("load", searchQuestions)
