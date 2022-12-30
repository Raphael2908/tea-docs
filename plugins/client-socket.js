import { io } from 'socket.io-client'

const socketIO = io('ws://tea-docs.zenr.ninja:8080', {
  path: "/tea-path/",
});

export default defineNuxtPlugin( () => {

    return {
        provide: {
          socket: socketIO
        }
    }
})
  