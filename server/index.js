import express from "express"
import {Server} from "socket.io"
import path from 'path'
import {fileURLToPath} from 'url'                   //access to dirname

const __filename = fileURLToPath(import.meta.url)   //access to dirname
const __dirname = path.dirname(__filename)          //acces to dirname

const PORT = process.env.PORT || 3500             //setup contsant for port

const app = express()                           //express server

app.use(express.static(path.join(__dirname, "public")))   //static assets from "public"

const expressServer = app.listen(PORT, ()=> {           //listen
  console.log(`Listening on port: ${PORT}`)
})  

const io = new Server(expressServer,{               //create socketio server conneted to express
  cors:{                                            //prevent unauthroized users
    origin: process.env.NODE_ENV === "production" ? false :   //dont allow node in production
    ["http://localhost:5500", "http://127.0.0.1:5500"]
    // // not a cross orgin server anymore                        
  }
}) 

io.on('connection', socket => {                         //socketio server listen for connection
  console.log(`User ${socket.id} connected`)            //get socket id
  socket.on('message', data => {
    console.log(data)
    io.emit('message',`${socket.id.substring(0,5)}: ${data}`)   //emit "message" to all sockets 
  })                                                            //connected adn send data
})

