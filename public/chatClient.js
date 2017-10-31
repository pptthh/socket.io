const socket = io();
const log = console.log;
function handleSendMsg(){
    log('socket.emit("chat message"):',{
        userName: document.getElementById("userName").value,
        msg: document.getElementById("textMsg").value,
    });
    socket.emit('chat message',{
        userName: document.getElementById("userName").value,
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
    const roomName = document.getElementById("newRoom").value;
    document.getElementById("newRoom").value = '';
    log('addRoom:', roomName);
    socket.emit('addRoom',roomName);
}
socket.on('addRoom', roomName =>
{
    log('addRoom:', roomName, 'from SRV');
    const o1 = document.createElement('option');
    const o2 = document.createElement('option');
    o1.label = o2.label = o1.value = o2.value = roomName;
    document.getElementById("roomList").appendChild(o1);
    document.getElementById("msg2room").appendChild(o2);
});

function joinRoom(roomName)
{
    log('joinRoom:',roomName);
    const option = document.createElement('option');
    option.label = option.value = roomName;
    document.getElementById("msg2room").appendChild(option);
}

function leaveRoom(roomName)
{
    log('leaveRoom:',roomName);
    const select = document.getElementById("msg2room");
    
//  ??????    
    select.options.remove(option => option.value == roomName);
return;    
    let index = -1;
    select.options.some(
        function(option, i, a)
        {
            if (option.value == roomName) 
            {
                index = i;
                return true;
            }
            return false;
        }
    );
    select.options.splice(index,1);
}
