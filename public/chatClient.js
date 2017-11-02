const socket = io();
const log = console.log;
function handleSendMsg(){
    const channel = document.getElementById("msg2room").value;
    log('socket.emit("' + channel + '"):',{
        userName: document.getElementById("userName").value,
        textMsg: document.getElementById("textMsg").value,
    });
    socket.emit(channel,
        {
            userName: document.getElementById("userName").value,
            textMsg: document.getElementById("textMsg").value
        }
    );
    msg: document.getElementById("textMsg").value = '';
}
socket.on('everybody', msg =>
{
    displayNewSrvMsg(msg, 'everybody');
});

function displayNewSrvMsg(msg, eventName)
{
    log(msg, eventName);
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    document.getElementById("messages").appendChild(li);

    if (eventName)
    {
        const span = document.createElement("span");
        span.className = 'eventName';
        span.appendChild(document.createTextNode(eventName));
        li.appendChild(span);
    }
}

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
    //const o2 = document.createElement('option');
    o1.label = o1.value = roomName;
//    o2.label = o2.value = roomName;
    document.getElementById("roomList").appendChild(o1);
//    document.getElementById("msg2room").appendChild(o2);
});

const channels = {};
function joinRoom(roomName)
{
    log('joinRoom:',roomName);
    const option = document.createElement('option');
    option.label = option.value = roomName;
    document.getElementById("msg2room").appendChild(option);

    channels.roomName = new Channel(roomName);
}

function leaveRoom(roomName)
{
    log('leaveRoom:',roomName);
    const select = document.getElementById("msg2room");
    let i = select.options.length;
    while (i -- > 0)
    {
        if (select.options[i].value == roomName)
        {
            return select.options.remove(i);
        }
    }
    delete channels.roomName;
}

class Channel
{
    constructor (roomName)
    {
        socket.on(roomName, msg =>
            {
                if (channels.roomName === this)
                {
                    displayNewSrvMsg(msg, roomName);
                }
                else
                {
                    log('garbage in the memory', roomName);
                }
            }
        );
    }
}