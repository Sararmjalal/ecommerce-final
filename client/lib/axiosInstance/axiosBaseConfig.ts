import {axiosClient} from "./axiosClient";

type URL = string;

export async function getRequest(URL: URL) {
  return await axiosClient.get(`/${URL}`).then((response) => response);
}

export async function postRequest(URL: URL, payload: any) {
  return await axiosClient
    .post(`/${URL}`, payload) 
    .then((response) => response);
}

