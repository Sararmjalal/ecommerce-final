import { useRouter } from 'next/router'
import { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdmin, setCurrentAdmin } from '../../global-state/slice'
import { useMutation } from '@tanstack/react-query'
import { adminLoginOne, adminLoginTwo, adminInfo } from '../../apis'
import { handleEmptyFields, setToken } from '../../lib'
import { Form } from '../../lib/interfaces'

const AdminLogin = () => {

  const thisAdmin = useSelector(selectAdmin)

  const dispatch = useDispatch()

  const router = useRouter()

  const [data, setData] = useState<Form>({
    phone: {
      msg: "",
      value: ""
    },
    code: {
      msg: "",
      value: ""
    },
  })

  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(1)

  useLayoutEffect(() => {
    thisAdmin ? router.push('/admin/dashboard') : setLoading(false)
  }, [])

  const getAdminInfo = useMutation({
    mutationFn: async () => await adminInfo(),
    onSuccess: (res) => {
      dispatch(setCurrentAdmin(res.data))
      router.push('/admin/dashboard')
    }
  })

  const loginTwo = useMutation({
    mutationFn: async () => await adminLoginTwo('09120202020', '1111'),
    onSuccess: (res) => {
      setToken(res.data.token, 'admin')
      getAdminInfo.mutate()
    }
  })

  const loginOne = useMutation({
    mutationFn: async () => await adminLoginOne('09120202020'),
    onSuccess: () => setStep(2)
  })
  
  if(loading) return <h1>Loading....</h1>
  return (
    <div
      className='flex flex-col justify-center h-screen w-[448px] m-auto sm:w-full'>
      <p className='text-black font-semibold text-xl mt-4 text-center'>Admin Login</p>
      <p className='text-grayish text-sm text-center mt-6'>
        Please enter your phone number here
      </p>
      <div className='w-full'>
        <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
          {data.phone.msg}
        </div>
        <input
          type='text'
          name="phone"
          className={`input-primary ${data.phone.msg ? 'border-[1px] border-reddish text-reddish mt-0 mb-2' : 'my-2'}`}
          placeholder='Phone Number'
          value={data.phone.value}
          // disabled={mutation.isSuccess}
          onChange={(e) => {
            const { name, value } = e.target
            setData({
              ...data,
              [name]: {
                msg: "",
                value
              }})
          }}
          onKeyDown={(e) => e.key === 'Enter' && loginOne.mutate()}
        />
      </div>
      <button
        className='btn-primary hover:border-[1px] hover:border-grayish w-full mt-5 py-4'
        onClick={() => loginTwo.mutate()}
      >
        Get Code
      </button>  
      <div>
        {/* <p className='text-left mt-6 font-semibold ml-2 text-sm'>{mutation.isSuccess && "Admin created successfully!"}</p> */}
      </div>
    </div>
  )
}

export default AdminLogin