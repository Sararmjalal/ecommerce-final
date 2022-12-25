import Cookies from "universal-cookie";

export default (token: string, type: string) => type === 'admin' ?
  new Cookies().set('at', `ut ${token}`, { path: '/'})
  :
  new Cookies().set('ut', `ut ${token}`, {path: '/'})