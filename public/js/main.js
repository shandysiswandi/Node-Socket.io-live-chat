// make koneksi with socket.io
let socket = io.connect('localhost:8000');

// query dom
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let output = document.getElementById('output');
let feed = document.getElementById('feedback');
let button = document.getElementById('send');

// emit event
button.addEventListener('click', ()=>{
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value);
});

// listen for event
socket.on('chat', (data)=>{
    feed.innerHTML ='';
    output.innerHTML += '<p><strong class="text-primary">'+ data.handle +'</strong>: '+ data.message +'</p>';
});

socket.on('typing', (data)=>{
    feed.innerHTML = '<p><em class="text-primary">'+ data +' is typing a message...</em></p>';
});