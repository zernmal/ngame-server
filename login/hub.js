const rcache = require('../common/cache').room;
const msg = require('../common/utils/msg');

let _ws;

// 定时广播房间列表到大厅
const sendRoomList = () => {
  setInterval(async () => {
    const rl = await rcache.getList();
    msg.broadcast('roomlist', rl);
  }, 2000);
};

module.exports = {
  init(ws) {
    _ws = ws;
    sendRoomList();
  }
}
