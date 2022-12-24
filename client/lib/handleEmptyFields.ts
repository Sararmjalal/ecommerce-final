import { Form } from "./interfaces";

export default function handleEmptyFields(obj: Form): Form {
    Object.entries(obj).forEach(([key, val]) => {
      if(!val.value) obj[key]['msg'] = 'This field cannot be empty'
    })
  return obj
}