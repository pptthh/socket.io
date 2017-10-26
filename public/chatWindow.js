const socket = io();

function handleButtonClick(){
    console.log('socket.emit("chat message"):',{
        nm: document.getElementById("nm").value,
        msg: document.getElementById("msg").value,
    });
    socket.emit('chat message',{
        nm: document.getElementById("nm").value,
        msg: document.getElementById("msg").value,
    });
    msg: document.getElementById("msg").value = '';
}

socket.on('chat message', msg =>
{
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    document.getElementById("messages").appendChild(li);
});