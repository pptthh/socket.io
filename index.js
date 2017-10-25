const app = require('express')();
const http = require('http').Server(app);
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chatWindow.html');
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});