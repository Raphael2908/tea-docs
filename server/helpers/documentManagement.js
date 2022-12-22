import { supabase } from "../database/client"

export const newDocument = async function(req){
    if(req.title == null){
        req.title = 'Freshly Brewed Document'
    }

    const { data, error } = await supabase
        .from('documents')
        .insert({title: req.title})
        .select()
    
    if(error){
        return error
    }
    return data
}