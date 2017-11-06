const socket = io();
const log = console.log;
const element = htmlId => document.getElementById(htmlId);
const inputVal = id => element(id).value;
const textNode = txt => document.createTextNode(txt);
const newElement = e => document.createElement(e);

function handleSendMsg(){
    const channel = inputVal("msg2room");
    log('socket.emit("' + channel + '"):',{
        userName: inputVal("userName"),
        textMsg: inputVal("textMsg"),
    });
    socket.emit(channel,
        {
            userName: inputVal("userName"),
            textMsg: inputVal("textMsg")
        }
    );
    msg: element("textMsg").value = '';
}
socket.on('everybody', msg =>
{
    displayNewSrvMsg(msg, 'everybody');
});

function displayNewSrvMsg(msg, eventName)
{
    log(msg, eventName);
    const li = document.createElement("li");
    li.appendChild(textNode(msg));
    element("messages").appendChild(li);

    if (eventName)
    {
        const span = document.createElement("span");
        span.className = 'eventName';
        span.appendChild(textNode(eventName));
        li.appendChild(span);
    }
}

const selectedRooms = [];
function handleSelectedRooms(event)
{
    if (event.target.nodeName == 'OPTION')
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
}

function handleAddRoom()
{
    const roomName = inputVal("newRoom");
    element("newRoom").value = '';
    log('addRoom:', roomName);
    socket.emit('addRoom',roomName);
}
const rooms = {};
socket.on('addRoom', roomName =>
{
    if (rooms[roomName])
        return log('addRoom:', roomName, 'from SRV but it already exists');
    rooms[roomName] = true;
    log('addRoom:', roomName, 'from SRV');
    const o1 = document.createElement('option');
    o1.label = o1.value = roomName;
    element("roomList").appendChild(o1);
});

const channels = {};
function joinRoom(roomName)
{
    log('joinRoom:',roomName);
    const option = document.createElement('option');
    option.label = option.value = roomName;
    element("msg2room").appendChild(option);

    channels.roomName = new Channel(roomName);
}

function leaveRoom(roomName)
{
    log('leaveRoom:',roomName);
    const select = element("msg2room");
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
        socket.on(
            this.roomName = roomName,
            this.fn = msg =>
            {
                if (channels.roomName === this)
                {
                    displayNewSrvMsg(msg, roomName);
                }
                else
                {
                    log('garbage in the memory', roomName);
                    this.off();
                }
            }
        );
    }
    
    off(){socket.off(this.roomName, this.fn)}
}