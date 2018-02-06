const { servers } = require('../config');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: servers.login.port });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message);
  });


  ws.on('error', err => {
    console.log(err);
    ws.close();
  });


  ws.send('something');
  ws.send('something2');
  ws.send('something3');
});

console.log(`WebSocket server is listening on ${servers.login.port}`);
