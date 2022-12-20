import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = { baseURL: process.env.SERVER };

const axiosClient = axios.create(config);

const getRequest = async(url:string) => await axiosClient.get(url)

const postRequest = async (url: string, payload: Object) =>
  await axiosClient.post(url, payload); 

export { getRequest, postRequest }