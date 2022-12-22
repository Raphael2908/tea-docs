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
    return data
})