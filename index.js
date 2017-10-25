const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chatWindow.html');
});

io.on('connection', function(socket){
    console.log('\n\na user connected', socket.handshake.query);
});

http.listen(port, function(){
    console.log(`listening on *:${port}`);
});