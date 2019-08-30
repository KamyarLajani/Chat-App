"use strict";
let socket = new WebSocket('ws://localhost:8080');
let chat = document.querySelector('.chat');
let inputMsg = document.querySelector('.message input');
let sendMsg = document.querySelector('.message button');
let eleMsg = document.querySelector('.chat div');
let inputName = document.querySelector('.name input');
let sendName = document.querySelector('.name button');
let eleName = document.querySelector('.chat header');
socket.onopen = ()=>{
  console.log('connected to the server');
  
}
let parsed;
socket.onmessage = (event)=>{
  parsed = JSON.parse(event.data);
  if(parsed.type === 'message'){
    eleMsg.innerHTML += `<div class="message-area">
                          <p class="sender">${parsed.message}</p>
                          <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
                      </div>`;
    chat.scrollTo(0, chat.scrollHeight);
  }
  else {
    eleName.innerText = `${parsed.message}`;
  }

}

sendMsg.onclick = ()=>{
  socket.send(JSON.stringify({type:'message', message: inputMsg.value}));
  eleMsg.innerHTML += `<div class="message-area">
                          <p>${inputMsg.value}</p>
                          <span>${new Date().getHours()}:${new Date().getMinutes()}</span>
                      </div>`;
  inputMsg.value = '';
  chat.scrollTo(0, chat.scrollHeight);
}

 inputMsg.onkeypress = (e)=>{
  if(e.key === 'Enter'){
    sendMsg.click();
  }
 
}


sendName.onclick = ()=>{
  socket.send(JSON.stringify({type:'name', message: inputName.value}));

}
