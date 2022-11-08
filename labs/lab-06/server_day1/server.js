const express = require('express')
const app = express()
const port = 3000

// IF a requested file is availbale inside the pblic
// folder, just return. no questions asked.
app.use(express.static('public'));

// different routes  url/something/someething

app.get('/', (req, res) => {
  res.send('Bye World! !!')
})

app.get('/swimmingpool', (req, res) => {
    console.log("someone wants to swim in the swimmingpool");
    res.send('~~~~~~~~~~~~~~~')
})

app.get('/guess', (req, res) => {
    console.log(req.query);
    if(req.query.password == "shoelace"){
        res.send('thats it, you are a member of our cult')
    }else{
        res.send('wrong wrong wrong, guess again')

    }
})

// console.log("what's direname", __dirname);

// app.get('/treehouse', (req, res) => {
//     console.log("someone wants to visit the treehouse");
//     res.sendFile(__dirname+"/treehouse/index.html");
// })



// app.get('/treehouse/style.css', (req, res) => {
//     console.log("someone wants to visit the treehouse STYLING SECTION");
//     res.sendFile(__dirname+"/treehouse/style.css");
// })







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})