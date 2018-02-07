const WebSocket = require('ws');
const handler = {};

let _ws;

const encode = (route, data) => {
  return JSON.stringify({r: route, d: data});
};
const decode = (content) => {
  return JSON.parse(content);
};

module.exports = {
  init(ws){
    _ws = ws;
  },

  encode,

  register(client, route, func) {
    handler[route] = func.bind(client);
  },

  broadcast(route, data) {
    if (!_ws) {
      return console.error('_ws object haven\'t been inited');
    }
    _ws.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(encode(route, data));
      }
    });
  },
  
  async dispatch(content) {
    try {
      const msg = decode(content);
      if (typeof handler[msg.r] === 'function') {
        await handler[msg.r](msg.d);
        return true;
      }
      console.log(`no handle route ${msg.r}`);
    } catch(e) {
      console.log('parse msg error');
    }
    return false;
  }
}
