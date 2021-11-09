console.log(process.env.PORT);

const express = require('express')
const app = express()
const port = 3123
// const port = process.env.PORT   //for glitch


app.use(express.static("public"));

let counter = 0;

app.get('/add', (req, res) => {
  counter++;
  console.log("someone added one", counter)

  res.json({value: counter})

})
app.get('/getCurrent', (req, res) => {
  console.log("someone check for updates")
  res.json({value: counter})

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
