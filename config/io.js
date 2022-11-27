const { on } = require('../models/user');

let io;

module.exports = {
  init,
  getIo
}

function init(http) {
    io = require('socket.io')(http);

    let onlineUsers = [];
    let onlineUsersObj = [];

    io.on('connection', function(socket) {
        console.log('Client socketed connected');

    // Other message listeners below here (stay inside of this 'connection' callback)

        socket.on('register-user', function(newUserId, allUsers) {
            if(!onlineUsers.some(user => user.userId === newUserId)) {
                onlineUsers.push({
                    userId: newUserId,
                    socketId: socket.id
                })
            }
            io.emit('get-users', onlineUsers);
            console.log(onlineUsers);
        })

        socket.on('disconnect', function() {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
            console.log('User Disconnected', onlineUsers);
            io.emit('get-users', onlineUsers);
        })

        socket.on('setup', function(user) {
            socket.join(user._id);
            socket.emit('connected');
        })

        socket.on('join-chat', function(room) {
            socket.join(room);
            console.log('User Joined Room', room);
        })

        socket.on('new-message', function(newMessage, secondUser, selectedInbox, previousMessages) {

            selectedInbox.users.forEach(user => {
                if(user === newMessage.senderId) return;

                socket.in(user).emit('message-receive', newMessage, previousMessages);
            })
        })

        socket.on('new-inbox', function(newInbox, clickedUser) {
            socket.in(clickedUser._id).emit('update-inbox-list', newInbox);
            console.log(clickedUser);
        })

    });
}

// Used to access the io object from controller modules
function getIo() {
  return io;
}
