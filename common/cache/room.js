const fs = require('fs-extra');
const path = require('path');
const md5 = require('md5');

const runtimePath = path.resolve(__dirname, '../../runtime');

module.exports = {
  async getRoom(rid) {

  },

  async setRoom(room) {
    
  },

  async removeRoom(room) {

  },

  async getList() {
    return {
      list: [{ id: 98765, pnum: 4}, { id: 98765, pnum: 4}]
    };
  },

  async genRid() {
      
  }
};
