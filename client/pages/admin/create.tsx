import { useRouter } from 'next/router'
import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAdmin } from '../../global-state/slice'
import { useMutation } from '@tanstack/react-query'
import { createAdmin } from '../../apis'
import { handleEmptyFields } from '../../lib'
import { Form } from '../../lib/interfaces'

const CreateAdmin = () => {

  const thisAdmin = useSelector(selectAdmin)

  const router = useRouter()

  const [data, setData] = useState<Form>({
    phone: {
      msg: "",
      value: ""
    },
    name: {
      msg: "",
      value: ""
    },
  })

  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    !thisAdmin ? router.push('/') : setLoading(false)
  }, [])

  const mutation = useMutation({
    mutationFn: async () => await createAdmin(data.name.value, data.phone.value)
  })

  const create = () => {
    const isEmpty = Object.values(data).some(val => !val.value)
    if (!isEmpty) return mutation.mutate()
    const clone = {...data}
    setData(handleEmptyFields(clone))
  }
  
  if(loading) return <h1>Loading....</h1>
  return (
    <div
      className='flex flex-col justify-center h-screen w-[448px] m-auto sm:w-full'>
      <p className='text-black font-semibold text-xl mt-4 text-center'>Create Admin</p>
      <p className='text-grayish text-sm text-center mt-6'>
        Please enter admin's name and phone number to create
      </p>
      <div className='w-full'>
        <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
          {data.name.msg}
        </div>
      <input
          type='text'
          name="name"
          value={data.name.value}
          className={`input-primary ${data.name.msg ? 'border-[1px] border-reddish text-reddish mt-0 mb-2' : 'my-2'}`}
          placeholder='Name'
          disabled={mutation.isSuccess}
          onChange={(e) => {
            const { name, value } = e.target
            setData({
              ...data,
              [name]: {
                msg: "",
                value
              }})
          }}
          onKeyDown={(e) => e.key === 'Enter' && create()}
        />
        <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
          {data.phone.msg}
        </div>
        <input
          type='text'
          name="phone"
          className={`input-primary ${data.phone.msg ? 'border-[1px] border-reddish text-reddish mt-0 mb-2' : 'my-2'}`}
          placeholder='Phone Number'
          value={data.phone.value}
          disabled={mutation.isSuccess}
          onChange={(e) => {
            const { name, value } = e.target
            setData({
              ...data,
              [name]: {
                msg: "",
                value
              }})
          }}
          onKeyDown={(e) => e.key === 'Enter' && create()}
        />
      </div>
      <button
        className='btn-primary hover:border-[1px] hover:border-grayish w-full mt-5 py-4'
        onClick={create}
      >
        Create
      </button>  
      <div>
        <p className='text-left mt-6 font-semibold ml-2 text-sm'>{mutation.isSuccess && "Admin created successfully!"}</p>
      </div>
    </div>
  )
}

export default CreateAdmin