import axios from "axios";
import { useToken } from "../lib";

const axiosClient = axios.create({ baseURL: process.env.SERVER });

const getRequest = async (url: string, requireAuth = false) => {
  const res = await axiosClient.get(url,{
    headers: {
      ...(requireAuth && {auth: useToken('user')})  
    }}
  )
  return res.status === 200 ? res.data : res
}

const postRequest = async (url: string, body: Object, authType?: string) => await axiosClient.post(url, body,{
    headers : {
      ...(authType && {auth: useToken(authType)})
    }
  })

export { getRequest, postRequest }