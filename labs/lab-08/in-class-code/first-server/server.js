const express = require('express')
const app = express()
const port = 3123

app.use(express.static("public"));

// deal with different routes that are requested
function ifSomeoneAskForRoot(req, res){
  // console.log(req);
  // console.log(__dirname);
  res.sendFile(__dirname + "/index.html")
}
app.get("/", ifSomeoneAskForRoot)

app.get('/leon', (req, res) => {
  res.send("Oh, it's just you. never mind")
})

// 
// app.get('/garden', (req, res) => {
//   res.sendFile(__dirname + "/garden/index.html")
// })
// app.get('/style.css', (req, res) => {
//   res.sendFile(__dirname + "/garden/style.css")
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
