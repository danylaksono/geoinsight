var sockets = require('socket.io');
var io;

exports.init = function(srv) {
    io = sockets(srv);
    io.on('connection', function(client) {
        console.log('new client connected');
        client.on('join', function(data) {
            client.emit('messages', {code:200, message: "connected to server"});
        });
    });
};

exports.io = function() {
    return io;
};
