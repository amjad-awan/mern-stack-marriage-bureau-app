import API from "./GlobalSender"


export const regsiterUser= ((url, data)=>API.post(url,data))
export const loginUser= ((url, data)=>API.post(url,data))


