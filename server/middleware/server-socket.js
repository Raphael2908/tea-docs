import { Server } from "socket.io";
import { supabase } from "../database/client";
import http from 'http'


const newServer = http.createServer().listen(8080);

const io = new Server(newServer, {
  cors: {
      origin: '*',
  }
});

io.on("connection", (socket) => {
  // receive a message from the client
  console.log('connection established')

  socket.on("client-changes", (data) => {
    storeText(data)
    socket.broadcast.emit(`new-changes-${data.id}`, data.delta)
  });
})

const storeText = async function(data){
  const { error } = await supabase
  .from('documents')
  .upsert({
    id: data.id,
    information: {
      delta: data.delta,
      oldDelta: data.oldDelta
    }
  })
  
  if(error){
    throw(error)
  }
}

export default defineEventHandler((event) => {
  return
})
