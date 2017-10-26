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
app.use('/p',express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/chatWindow.html'));

io.on('connection', socket =>
{
    console.log('a user connected', socket.handshake.query);
    
    socket.on('chat message', msg => io.emit('chat message', msg.nm + ':\t'+msg.msg));
    
    socket.on('chat message', msg =>
        console.log(socket.handshake.query.t,
            ' message: ' + msg,
            msg.nm,
            msg.msg)
        );
    
    socket.on('disconnect', () => console.log('user disconnected',socket.handshake.query));
});

http.listen(port, () => console.log(`listening on *:${port}`));
