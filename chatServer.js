const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,
{
    path: '/socket.io',
    serveClient: true,
    pingInterval: 10000,
    pingTimeout: 5000,
    transports : ['websocket', 'polling'],
    cookie: false,
    //  adapter:socket.io-adapter  //  default value
    //  parser:socket.io-parser
});
const port = 3000;
const log = console.log;
const rooms = [];
const participant = {};

app.use('/p',express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/chatWindow.html'));

io.on('connection', socket =>
{
    log('a user connected', socket.handshake.query);
    
    socket.on('chat message', msg => io.emit('chat message', msg.userName + ':\t'+msg.textMsg));
    
    socket.on('chat message', msg =>
        log(socket.handshake.query.t,
            ' message: ' + msg,
            msg.userName,
            msg.textMsg
        )
    );
    
    socket.on('disconnect', () => log('user disconnected',socket.handshake.query));
    
    socket.on('addRoom', roomName =>
    {
        log('addRoom', roomName,'|',rooms);
        rooms.push(roomName);
        io.emit('addRoom', roomName);
    });
    socket.on('joinRoom', roomName => log('joinRoom', roomName));
    socket.on('leaveRoom', roomName => log('leaveRoom', roomName));
});

http.listen(port, log(`listening on *:${port}`));

setInterval(() => io.emit('srvTime', new Date()),10000);