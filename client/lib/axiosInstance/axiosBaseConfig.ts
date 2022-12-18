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

export function patchRequest(URL: URL, payload: any) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL: URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
