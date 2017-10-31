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
    console.log('a user connected', socket.handshake.query);
    
    socket.on('chat message', msg => io.emit('chat message', msg.userName + ':\t'+msg.msg));
    
    socket.on('chat message', msg =>
        console.log(socket.handshake.query.t,
            ' message: ' + msg,
            msg.userName,
            msg.textMsg
        )
    );
    
    socket.on('disconnect', () => console.log('user disconnected',socket.handshake.query));
    
    socket.on('addRoom', roomName =>
    {
        console.log('addRoom', roomName);
        rooms.push(roomName);
    });
    socket.on('joinRoom', roomName => console.log('joinRoom', roomName));
    socket.on('leaveRoom', roomName => console.log('leaveRoom', roomName));
    
});

http.listen(port, () => console.log(`listening on *:${port}`));
