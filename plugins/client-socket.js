import { io } from 'socket.io-client'

const socketIO = io('https://tea-docs.zenr.ninja');

export default defineNuxtPlugin( () => {

    return {
        provide: {
          socket: socketIO
        }
    }
})
  