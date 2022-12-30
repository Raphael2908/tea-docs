import { io } from 'socket.io-client'

const socketIO = io('https://tea-docs.zenr.ninja:8080');

export default defineNuxtPlugin( () => {

    return {
        provide: {
          socket: socketIO
        }
    }
})
  