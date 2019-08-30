
const path = require('path');
const express = require('express');
const app = express();
app.use('/', express.static(path.join(__dirname, '/public')));
const webSocket = require('ws');
const wss = new webSocket.Server({port: 8080});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    
    wss.clients.forEach((client)=>{
      if(ws !== client && client.readyState === webSocket.OPEN){
        client.send(message);
      }
    });
  });

 
 

});

app.listen(80);
