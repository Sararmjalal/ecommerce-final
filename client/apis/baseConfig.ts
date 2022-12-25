import axios from "axios";
import { useToken } from "../lib";

const axiosClient = axios.create({ baseURL: process.env.SERVER });

const getRequest = async (url: string, requireAuth = false) => !requireAuth ?
  await axiosClient.get(url)
  :
  await axiosClient.get(url, {
  headers: {
    auth: useToken('user')
}})

const postRequest = async (url: string, body: Object, authType?: string) => await axiosClient.post(url, body,{
    headers : {
      ...(authType && {auth: useToken(authType)})
    }
  })

export { getRequest, postRequest }