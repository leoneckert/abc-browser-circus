let socket = io();


let form = document.getElementById('form');
let input = document.getElementById('input');
let messages = document.getElementById('messages');


form.addEventListener('submit', function(e) {

  e.preventDefault();

  console.log(input.value)
  if (input.value) {
    socket.emit('textToAllButMe', input.value);
    input.value = '';
  }

});



socket.on('text', function(msg) {
  console.log("text", msg);
});
