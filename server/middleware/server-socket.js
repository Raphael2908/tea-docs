import { Server } from "socket.io";
import { supabase } from "../database/client";
import { createServer } from "http";
const httpServer = createServer();

// const io = new Server(8080, {
//   cors: {
//       origin: '*',
//   }
// });

const io = new Server(httpServer, {
  cors: {
          origin: '*',
  }
});

httpServer.listen(8080);

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
