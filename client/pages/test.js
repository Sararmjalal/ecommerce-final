import * as React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { postRequest } from '../apis/baseConfig'
import axios from "axios";
import { useToken } from "../lib";
import { useQuery } from "@tanstack/react-query";
import {myAddresses} from '../apis'
const App = () => {
  const [img, setImg] = useState('')

  const upload = async() => {
    const formData = new FormData()
    formData.append('reserve', img)
    await fetch(`http://localhost:4313/file/upload-reserve`, {
      method: "POST",
      headers: {
        auth: useToken('admin')
      },
      body:formData
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const submitAvatar = async () => {
    try {

      console.log('submit avatar called')
      
      if (!file) return

      const formData = new FormData()
      formData.append('avatar', file)

      fetch(`${DOMAIN}/user/update-avatar`, {
        method: 'POST',
        headers: {
          'auth': `ut ${token}`
        },
        body: formData
      }).then(res => {
        console.log(res)
        
      }).then((data) => {
        console.log(data)
      })

    } catch (error) {
      console.log('lol')
    }
  }

  const { data } = useQuery({
    queryKey: ['address'],
    queryFn: async() => await myAddresses()
  })

  console.log(data)

  return (
    <div>
      <input
        type='file'
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
};

export default App;
