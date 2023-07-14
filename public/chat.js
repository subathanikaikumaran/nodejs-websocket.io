// Make connection
var socket = io.connect('http://localhost:4000')

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback')
      err = document.getElementById('err')

// Emit events
btn.addEventListener('click', () => {
    err.innerHTML =""
    if(message.value!=='' && handle.value!==''){
        socket.emit('chat message', {
            message: message.value,
            handle: handle.value
        });
        message.value = ""
        err.innerHTML =""
    } else {
        err.innerHTML = '<p><strong>Please enter the input</strong></p>'
    }
    
})

message.addEventListener('keypress', () => {
    err.innerHTML =""
    socket.emit('typing', handle.value)
})

// Listen for events
socket.on('chat message', (data) => {
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})