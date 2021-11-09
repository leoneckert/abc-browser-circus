let counter = document.getElementById("counter");
console.log(counter)
let n = 0;
document.body.addEventListener("click", ()=>{

  fetch("/add")
    .then(data=>data.json())
    .then(data=>{
      console.log("got data", data);
      counter.innerHTML = data.value;
    })

});

setInterval(()=>{
  fetch("/getCurrent")
    .then(data=>data.json())
    .then(data=>{
      console.log("got data", data);
      counter.innerHTML = data.value;
    })
}, 200)
