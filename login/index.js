import { fork } from 'cluster';

const WebSocket = require('ws');
const { servers } = require('../config');
const msg = require('../common/utils/msg');
const hub = require('./hub');
const handler = require('./handler');

const ws = new WebSocket.Server({ port: servers.login.port });

ws.on('connection', client => {
  client.on('message', message => {
    (async () => {
      const res = await msg.dispatch(message);
      
      if (!res) {
        // 信息解析错误，靠诉客户端原因后，主动与断开客户端
        client.send(msg.encode('kick'));
        client.close();
      }
    })();
  });

  client.on('error', err => {
    client.close();
  });

  Object.keys(handler).forEach(key => {
    msg.register(client, key, handler[key]);
  });
});

msg.init(ws);
hub.init(ws);

console.log(`WebSocket server is listening on ${servers.login.port}`);
