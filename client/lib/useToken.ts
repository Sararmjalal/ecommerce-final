import Cookies from "universal-cookie";

export default (type:string) => type === 'admin' ? (new Cookies()).get('at') : (new Cookies()).get('ut')