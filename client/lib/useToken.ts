import Cookies from "universal-cookie";

export default (type:string) => (new Cookies()).get(type === 'admin' ? 'at' : 'ut')