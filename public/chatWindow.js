const socket = io();

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
function handleSelectedRooms(event){
    event.ctrlKey = true;
    event.preventDefault();
    //event.defaultPrevented = true;
    console.log('handleSelectedRooms:', event);
    console.log('selection:', event.target.parentElement.selectedOptions);
    //event.target.selected = !event.target.selected;
    
    const index = selectedRooms.indexOf(event.target);
    console.log('index:', index, selectedRooms);
    if (index < 0)
    {
        selectedRooms.push(event.target);
    }
    else
    {
        event.target.selected = false;
        selectedRooms.splice(index,1);
    }
    selectedRooms.map(o => o.selected = true);
}
