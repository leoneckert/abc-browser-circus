const express = require('express')
const app = express()
const port = 3000

let collectedDestinations = [];


// If a requested file is availbale inside the pblic
// folder, just return. no questions asked.
app.use(express.static('stuff-everyone-can-get'));


app.get("/sendDestination", (req, res)=>{
    console.log("got new destination")
    let info = req.query;
    console.log(info); // { destination: 'helo' }
    let newDest = info.destination
    collectedDestinations.push(newDest);
    console.log(collectedDestinations);
    // res.send("goodbye")
    // res.sendFile("special.html")
})

app.get("/getDestinations", (request, response)=>{
    console.log("someone asks for this info", collectedDestinations)
    // response.send("leonleon");
    response.json({data: collectedDestinations, name: "leon"});
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})