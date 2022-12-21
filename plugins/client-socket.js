import { io } from 'socket.io-client'

const socketIO = io("ws://localhost:3001");

export default defineNuxtPlugin( () => {
    return {
        provide: {
          socket: socketIO
        }
    }
})
  