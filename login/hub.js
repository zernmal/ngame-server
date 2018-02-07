const rcache = require('../common/cache');
const msg = require('../common/utils/msg');

const _ws;

// 定时广播房间列表到大厅
const sendRoomList = () => {
  setInterval(() => {
    msg.broadcast('roomlist', rcache.getList());
  }, 2000);
};

module.exports = {
  init(ws) {
    _ws = ws;
    sendRoomList();
  }
}
