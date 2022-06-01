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


app.get('/rooms', (req, res) => {
  res.json(rooms)
});

app.post('/rooms', (req, res) => {
  const {roomId, userName} = req.body;
  if (rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []],
    ]))
  }
  // res.json([...rooms.values()]);
  res.send()
});

io.on('connection', socket => {
  console.log('socket connect', socket.id)
  socket.emit('request', /* … */); // emit an event to the socket
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */
  }); // listen to the event
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

httpServer.listen(port, (error) => {
  if (error) {
    throw Error(error)
  }
  console.log(`Example app listening on port ${port}!`)
});

