const socket = io();
const log = console.log;
function handleSendMsg(){
    console.log('socket.emit("chat message"):',{
        nm: document.getElementById("userName").value,
        msg: document.getElementById("textMsg").value,
    });
    socket.emit('chat message',{
        nm: document.getElementById("userName").value,
        msg: document.getElementById("textMsg").value,
    });
    msg: document.getElementById("textMsg").value = '';
}

socket.on('chat message', msg =>
{
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    document.getElementById("messages").appendChild(li);
});
const selectedRooms = [];
function handleSelectedRooms(event)
{
    const index = selectedRooms.indexOf(event.target);
    if (index < 0)
    {
        selectedRooms.push(event.target);
        joinRoom(event.target.value);
    }
    else
    {
        event.target.selected = false;
        selectedRooms.splice(index,1);
        leaveRoom(event.target.value);
    }
    selectedRooms.map(o => o.selected = true);
}

function handleAddRoom()
{
    const nr = document.getElementById("newRoom").value;
    document.getElementById("newRoom").value = '';
    log('addRoom:', nr);
}

function joinRoom(roomName)
{
    log('joinRoom:',roomName);
}
function leaveRoom(roomName)
{
    log('leaveRoom:',roomName);
}
