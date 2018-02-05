const { servers } = require('../config');
const io = require('socket.io')();

io.on('connection', function(socket){

  console.log('a user connected');
	socket.emit('connected', 'return -----');
});
io.listen(servers.login.port);
console.log(`login server is listening on ${servers.login.port}`);
