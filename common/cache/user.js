const fs = require('fs-extra');
const path = require('path');
const md5 = require('md5');

const runtimePath = path.resolve(__dirname, '../../runtime');
const tokenFile = path.resolve(runtimePath, 'token.json');
let tokenMap = {
  t2u:{},
  u2t:{}
};
const genUserFileName = uid => path.resolve(runtimePath, `${uid}.json`);
const getUserByUid = async (uid) => {
  if (!uid) {
    return false;
  }
  const user = await fs.readJson(genUserFileName(uid));
  return user || {};
};

module.exports = {
  async init() {
    const exists = await fs.pathExists(tokenFile);
    if (!exists) {
      await fs.writeJson(tokenFile, tokenMap);
    } else {
      tokenMap = fs.readJson(tokenFile);
    }
  },

  async login(user) {
    if (!uid) {
      return false;
    }
    const token = md5(`${Math.random()}${Data.now()}`);
    const userFile = genUserFileName(user.uid);

    user.token = token;
    
    const oldToken = tokenMap.u2t[user.uid];
    if (oldToken) {
      delete tokenMap.t2u[oldToken];
    }
    tokenMap.t2u[token];
    tokenMap.u2t[uid] = token;
    fs.writeJson(tokenFile, tokenMap);

    return user;
  },


  async update(user) {
    if (!user.uid) {
      return false;
    }
    const oldUser = await getUserByUid(user.uid);
    await fs.writeJson(genUserFileName(user.uid, Object.assign({}, oldUser, user)));
  },

  async getUserByToken(token) {
    if (!tokenMap.t2u[token]) {
      return false;
    }
    return await getUserByUid(tokenMap.t2u[token]);
  },

  getUserByUid
};
