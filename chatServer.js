const app = require('express')();
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

app.get('/', (req, res) => res.sendFile(__dirname + '/chatWindow.html'));

io.on('connection', socket =>
{
    console.log('a user connected', socket.handshake.query);
    
    socket.on('chat message', msg => io.emit('chat message', msg));
    
    socket.on('chat message', msg => console.log(socket.handshake.query.t,' message: ' + msg));
    
    socket.on('disconnect', () => console.log('user disconnected',socket.handshake.query));
});

http.listen(port, () => console.log(`listening on *:${port}`));
