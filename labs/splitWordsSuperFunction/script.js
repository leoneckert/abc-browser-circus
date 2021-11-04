let ptags = document.body.querySelectorAll("p");

javascript:(function(){

function superFunctionForTags(tag){
  let ignoreTags = ["SCRIPT", "BR", "STYLE", undefined, "PICTURE"];
  console.log("tag", tag);
  console.log("tag name", tag.tagName);
  console.log("tag outer", tag.outerHTML);
  if(ignoreTags.includes(tag.tagName) || tag.innerHTML == "" || tag.className == "leonleon"){
    return tag.outerHTML==undefined?"":tag.outerHTML;
  }
  let emptyTag = tag.cloneNode();
  emptyTag.innerHTML = "";
  // console.log("empty", emptyTag.outerHTML)
  let outterTags = emptyTag.outerHTML.split("><");
  outterTags[0]+=">";
  outterTags[1]="<"+outterTags[1];
//   console.log("child", tag);
//   console.log("childtext", tag.innerText);
  let spanifiedString = "";
  for(let j = 0; j < tag.childNodes.length; j++){
    let cn = tag.childNodes[j];
//     console.log(cn)
    if(cn.nodeName == "#text"){
        let words = cn.textContent.trim().split(" ").filter(word=>word!='');
        if(words.length>0){
          let spans = words.map(word=>{return "<span class='leonleon'>"+word+"</span>"});
          let spanString = spans.join(" ");
  //         console.log("spanstring:", spanString);
          spanifiedString+=spanString + " ";
        }
    }else{
        let spanString = superFunctionForTags(cn);
//         console.log("nested spanstring:", spanString);
        spanifiedString+=spanString + " ";
    }
  }
  return outterTags[0] + spanifiedString.substring(0,spanifiedString.length-1)  + outterTags[1];

}

// for(let i = 0; i < ptags.length; i++){
//   let p = ptags[i];
//   let pstring = superFunctionForTags(p);
//   p.innerHTML = pstring;
// }
document.body.innerHTML = superFunctionForTags(document.body);

let leonleons = document.getElementsByClassName("leonleon");
for(let i = 0; i < leonleons.length; i++){
  leonleons[i].addEventListener("mouseover", function(){
    leonleons[i].style.color = "coral";
  });

}

})()





// color

javascript:(function(){function superFunctionForTags(tag){let ignoreTags = ["SCRIPT", "BR", "STYLE", undefined, "PICTURE"];if(ignoreTags.includes(tag.tagName) || tag.innerHTML == "" || tag.className == "leonleon"){return tag.outerHTML==undefined?"":tag.outerHTML;;}let emptyTag = tag.cloneNode();emptyTag.innerHTML = "";let outterTags = emptyTag.outerHTML.split("><");outterTags[0]+=">";outterTags[1]="<"+outterTags[1];let spanifiedString = "";for(let j = 0; j < tag.childNodes.length; j++){let cn = tag.childNodes[j];if(cn.nodeName == "#text"){let words = cn.textContent.trim().split(" ").filter(word=>word!='');if(words.length>0){let spans = words.map(word=>{return "<span class='leonleon'>"+word+"</span>"});let spanString = spans.join(" ");spanifiedString+=spanString + " ";}}else{let spanString = superFunctionForTags(cn);spanifiedString+=spanString + " ";}}return outterTags[0] + spanifiedString.substring(0,spanifiedString.length-1) + outterTags[1];}document.body.innerHTML = superFunctionForTags(document.body);let leonleons=document.getElementsByClassName("leonleon");for(let i = 0; i < leonleons.length; i++){leonleons[i].addEventListener("mouseover", function(){leonleons[i].style.color = "coral";});}})()

// rotate

javascript:(function(){function superFunctionForTags(tag){let ignoreTags = ["SCRIPT", "BR", "STYLE", undefined, "PICTURE"];if(ignoreTags.includes(tag.tagName) || tag.innerHTML == "" || tag.className == "leonleon"){return tag.outerHTML==undefined?"":tag.outerHTML;;}let emptyTag = tag.cloneNode();emptyTag.innerHTML = "";let outterTags = emptyTag.outerHTML.split("><");outterTags[0]+=">";outterTags[1]="<"+outterTags[1];let spanifiedString = "";for(let j = 0; j < tag.childNodes.length; j++){let cn = tag.childNodes[j];if(cn.nodeName == "#text"){let words = cn.textContent.trim().split(" ").filter(word=>word!='');if(words.length>0){let spans = words.map(word=>{return "<span class='leonleon'>"+word+"</span>"});let spanString = spans.join(" ");spanifiedString+=spanString + " ";}}else{let spanString = superFunctionForTags(cn);spanifiedString+=spanString + " ";}}return outterTags[0] + spanifiedString.substring(0,spanifiedString.length-1) + outterTags[1];}document.body.innerHTML = superFunctionForTags(document.body);let leonleons=document.getElementsByClassName("leonleon");for(let i = 0; i < leonleons.length; i++){leonleons[i].addEventListener("mouseover", function(){leonleons[i].style.display = "inline-block";leonleons[i].style.transition = "transform 400ms";leonleons[i].style.transform = "rotate(180deg)";});}})()
