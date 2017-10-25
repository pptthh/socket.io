const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chatWindow.html');
});

io.on('connection', function(socket){
    console.log('\na user connected', socket.handshake.query);

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('chat message', function(msg){
        console.log(socket.handshake.query.t,' message: ' + msg);
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected',socket.handshake.query);
    });
});

http.listen(port, function(){
    console.log(`listening on *:${port}`);
});