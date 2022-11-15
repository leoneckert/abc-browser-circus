console.log("js there?????????");
let input = document.getElementById("input");
let button = document.getElementById("button");
let getDataButton = document.getElementById("getData");

getDataButton.addEventListener("click", ()=>{
    // ask server for data
    fetch("getDestinations").then((responseFromServer)=>{
        return responseFromServer.json();
    }).then((processedData)=>{
        console.log(processedData)
        console.log(processedData.data)
        let destinations = processedData.data;

        // for each element in the array, make a p tag
        destinations.forEach(destination=>{
            let p = document.createElement("p");
            p.innerHTML = destination;
            document.body.appendChild(p)
        })
    })

    
    ;
})

button.addEventListener("click", ()=>{
    let destination = input.value;
    console.log(destination);
    // send this value to the server!
    let route = "sendDestination?destination="+destination;
    fetch(route);

    input.value = "";
})

