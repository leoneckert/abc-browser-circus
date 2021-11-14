let socket = io();


let form = document.getElementById('form');
let input = document.getElementById('input');
let messages = document.getElementById('messages');


form.addEventListener('submit', function(e) {

  e.preventDefault();

  console.log(input.value)
  if (input.value) {
    socket.emit('chatMessage', input.value);
    input.value = '';
  }

});



socket.on('messageFromSomeone', function(msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
