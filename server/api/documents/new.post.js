import { newDocument } from "../../helpers/documentManagement"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const res = await newDocument(body)
        return res
    } catch (error) {
        showError()
        return error   
    }
    
})
  