const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/chatWindow.html'));

io.on('connection', socket =>
{
    console.log('\na user connected', socket.handshake.query);
    
    socket.on('chat message', msg => io.emit('chat message', msg));
    
    socket.on('chat message', msg => console.log(socket.handshake.query.t,' message: ' + msg));
    
    socket.on('disconnect', () => console.log('user disconnected',socket.handshake.query));
});

http.listen(port, () => console.log(`listening on *:${port}`));
