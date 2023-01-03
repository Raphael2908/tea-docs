import { supabase } from "../database/client";

const channel = supabase.channel('room1')
channel.subscribe((status) => {
  if (status === 'SUBSCRIBED') {
    // now you can start broadcasting cursor positions
    console.log('The Server got you')
  }
})

channel.on('broadcast', {event: 'text-change'}, (payload) => {
  storeText(payload.payload)
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
