import { useRouter } from 'next/router'
import { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdmin, setCurrentAdmin } from '../../global-state/slice'
import { useMutation } from '@tanstack/react-query'
import { adminLoginOne, adminLoginTwo, adminInfo } from '../../apis'
import { setToken } from '../../lib'
import { Form } from '../../lib/interfaces'
import OtpInput from '../../components/main/OtpInput'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

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
    mutationFn: async () => await adminLoginTwo(data.phone.value, data.code.value),
    onSuccess: (res) => {
      setToken(res.data.token, 'admin')
      getAdminInfo.mutate()
    },
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const { msg } = error?.response?.data
        if(msg === 'wrong code') return setData({
          ...data, code:
          {
            ...data.code,
            msg: "Wrong code lool"
          }
        })
        toast.error(msg + '. Please try again.')
      }
    }
  })

  const loginOne = useMutation({
    mutationFn: async () => await adminLoginOne(data.phone.value),
    onSuccess: () => setStep(2),
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const {msg} = error?.response?.data
        if (msg === 'bad request: no such admin exists in our database')
          return setData({
            ...data, phone:
            {
              ...data.phone,
              msg: "You're not an admin lool"
            }
          })
        return setData({
          ...data, phone:
          {
            ...data.phone,
            msg: "Phone number isn't valid lool"
          }
        })
      }
    }
  })

  const handleFirstStep = () => {
    return data.phone.value ?
    loginOne.mutate()
    :
    setData({
      ...data,
      phone: {
        ...data.phone,
        msg: "Phone cannot be empty!"
      }
    })
  }

  const handleSecondStep = () => {
    return data.code.value.length === 4 ? 
      loginTwo.mutate()
      :
      setData({
        ...data,
        code: {
          ...data.code,
          msg: "Please enter 4 digits lool"
        }
      })
  }
  
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
          autoFocus
          type='text'
          name="phone"
          className={`input-primary ${data.phone.msg ? 'border-[1px] border-reddish text-reddish mt-0 mb-2' : 'my-2'}`}
          placeholder='Phone Number'
          value={data.phone.value}
          disabled={step === 2}
          onChange={(e) => {
            const { name, value } = e.target
            setData({
              ...data,
              [name]: {
                msg: "",
                value
              }})
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleFirstStep()}
        />
        {step === 2 ? 
          <div>
            <div className='my-4'>
            <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
              {data.code.msg}
            </div>
            <OtpInput
              value={data.code.value}
              onChangeHandler={(value) =>
                setData({
                  ...data,
                  code: {
                    msg: "",
                    value: value
                  }
                })}
                valueLength={4}
                onKeyDownFunction={handleSecondStep}
            />
              </div>
            <div className='grid grid-cols-2 gap-9'>
              <button
                className='btn-secondary w-full py-4 font-normal mt-5'
                onClick={() => setStep(1)}>
                Change Number
              </button> 
              <button
            className='btn-primary w-full py-4 mt-5'
            onClick={() => loginTwo.mutate()}>
            Login
          </button> 
          </div>
          </div>
          :
          <button
            className='btn-primary hover:border-[1px] hover:border-grayish w-full mt-5 py-3'
            onClick={handleFirstStep}>
            Get Code
          </button>  
        }
      </div>

      <div>
        {/* <p className='text-left mt-6 font-semibold ml-2 text-sm'>{mutation.isSuccess && "Admin created successfully!"}</p> */}
      </div>
    </div>
  )
}

export default AdminLogin