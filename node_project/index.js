const port = 3030;

const express = require('express')
const app = express();
const httpServer = require('http').Server(app)
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json())

const rooms = new Map()

app.get('/rooms/:id', (req, res) => {
  const {id: roomId} = req.params
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()],
  } : {users: [], messages: []}
  res.json(obj)
});

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    )
  }
  res.send()
});

io.on('connection', socket => {
  console.log('socket connect', socket.id)
  // socket.emit('request', /* … */); // emit an event to the socket
  // io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('ROOM:JOIN', ({roomId, userName}) => {
    socket.join(roomId)
    rooms.get(roomId).get('users').set(socket.id, userName)
    const users = [...rooms.get(roomId).get('users').values()]
    socket.to(roomId).emit('ROOM:JOINED', users)
  });
  socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
    const obj ={
      userName,
      text
    }
    rooms.get(roomId).get('messages').push(obj)
    socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj)

  });
  // listen to the event
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()]
        socket.to(roomId).emit('ROOM:SET_USERS', users)
      }
    })
  });
});

httpServer.listen(port, (error) => {
  if (error) {
    throw Error(error)
  }
  console.log(`Example app listening on port ${port}!`)
});

