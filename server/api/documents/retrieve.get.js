import { supabase } from "~~/server/database/client";

export default defineEventHandler( async (event) => {
    const query = getQuery(event)

    const { data, error } =  await supabase
    .from('documents')
    .select()
    .eq('id', query.id)
    
    
    if(error){
        return error
    }

    if(data[0].information == '' || data[0].information == null){
        return null
    }
    
    return {
        delta: JSON.parse(data[0].information).delta,
        oldDelta: JSON.parse(data[0].information).oldDelta 
    }
})