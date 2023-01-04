import { supabase } from "~~/server/database/client";

export default defineEventHandler( async (event) => {
    const { data, error } =  await supabase
    .from('documents')
    .select()
    .neq('information', null)
    
    if(error){
        return error
    }
    return { data }
})