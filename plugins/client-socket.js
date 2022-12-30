import { io } from 'socket.io-client'

const socketIO = io('ws://tea-docs.zenr.n/:8080');

export default defineNuxtPlugin( () => {

    return {
        provide: {
          socket: socketIO
        }
    }
})
  