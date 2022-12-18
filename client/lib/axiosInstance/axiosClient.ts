import axios, {AxiosRequestConfig} from "axios";

export function getJWTHeader(user: any): Record<string, string> {
  return {Authorization: `Bearer ${user.token}`};
}

const config: AxiosRequestConfig = {baseURL: process.env.SERVER};
export const axiosClient = axios.create(config);
