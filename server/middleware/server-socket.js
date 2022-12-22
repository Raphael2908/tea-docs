import { Server } from "socket.io";
import { supabase } from "../database/client";

const io = new Server(3001, {
  cors: {
      origin: '*',
  }
});

io.on("connection", (socket) => {
  // receive a message from the client
  socket.on("text editor inputs from client", (data) => {
    storeText(data)
    setTimeout(500)
  });
})

export default defineEventHandler((event) => {
  console.log('New request: ' + event.node.req.url)
  return
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

