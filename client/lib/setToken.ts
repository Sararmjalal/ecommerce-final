import Cookies from "universal-cookie";

export default (token: string, type: string) => new Cookies().set(`${type === 'admin' ? 'at' : 'ut'}`, `ut ${token}`, { path: '/'})