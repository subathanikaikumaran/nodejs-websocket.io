const express = require('express')
const socket = require('socket.io')
const app = express()

const server = app.listen(4000, () => {
    console.log('app is running on 4000 port');
})

app.use(express.static('public'))

const io =  socket(server)
io.on('connection', (socket) => {

    console.log('a user connected',socket.id)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    // Handle chat event
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.sockets.emit('chat message',msg)
    })


    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data)
    })

})