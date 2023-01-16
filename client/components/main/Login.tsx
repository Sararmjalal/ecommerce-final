import {userLoginOne, userLoginTwo, userInfo, myCart} from "../../apis";
import {setCurrentCart, setCurrentUser} from "../../global-state/slice";
import {handleEmptyFields, setToken} from "../../lib";
import {useMutation} from "@tanstack/react-query";
import {AiOutlineClose} from "react-icons/ai";
import {Form} from "../../lib/interfaces";
import { useRouter } from "next/router";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import OtpInput from "./OtpInput";
import {AxiosError} from "axios";
import {useState} from "react";
import Timer from "./Timer";

export default function Login({closeHandler, signUpHandler}: any) {
  
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const router = useRouter();

  const onChangeHandler = (value: string) => setData({...data, code: {...data.code, value}});

  const [data, setData] = useState<Form>({
    phone: {
      msg: "",
      value: "",
    },
    code: { 
      msg: "",
      value: "",
    },
  });

  const loginOne = useMutation({
    mutationFn: async () => await userLoginOne(data.phone.value),
    onSuccess: () => setStep(step + 1),
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const {msg} = error.response?.data;
        if (msg === "Provided value is not a valid Phone Number")
          return setData({...data, phone: {...data.phone, msg: "Please enter a valid phone number"}})
          setData({...data, phone: {...data.phone, msg: "You're not a member lool"}})
      }
    },
  });

  const loginTwo = useMutation({
    mutationFn: async () => await userLoginTwo(data.phone.value, data.code.value),
    onSuccess: (res) => {
      setToken(res.data.token, "user");
      getUserInfo.mutate();
    },
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const {msg} = error.response?.data;
        if (msg === "wrong code")
          return setData({...data, code: {...data.code, msg: "Wrong Code!"}});
        if (msg === "time's up")
          return setData({
            ...data,
            code: {...data.code, msg: "Time's up! Try Again."},
          });
        return setData({
          ...data,
          code: {...data.code, msg: "Enter Sent Code!"},
        });
      }
    },
  });

  const getUserInfo = useMutation({
    mutationFn: async () => await userInfo(),
    onSuccess: async(res) => {
      dispatch(setCurrentUser(res.data));
      const thisCart = await myCart()
      dispatch(setCurrentCart(thisCart['cart']))
      closeHandler();
      toast.success("You're in!")
      router.push('/dashboard')
    },
  });

  const getLoginCode = () => {
    const isEmpty = Object.entries(data).some(([key, val]) => {
      if (key !== "code") return !val.value;
    });
    if (!isEmpty) return loginOne.mutate();
    const clone = {...data};
    setData({
      code: {
        value: "",
        msg: "",
      },
      phone: handleEmptyFields(clone)["phone"],
    });
  };

  const handleSecondStep = () => {
    return data.code.value.length === 4
      ? loginTwo.mutate()
      : setData({
          ...data,
          code: {
            ...data.code,
            msg: "Please enter 4 digits lool",
          },
        });
  };

  return (
    <>
      <div onClick={closeHandler} className='modal-backdrop'></div>
      <div className='modal-container'>
        <AiOutlineClose
          onClick={closeHandler}
          color={"#000"}
          size={17}
          cursor={"pointer"}
          className='absolute top-0 right-0 mt-9 mr-9 hover:scale-150 transition-all'
        />
        <p className='text-black font-semibold text-xl mt-4'>Log in</p>
        <p className='text-grayish text-sm text-center mt-6'>
          Please log in to use all e-commerce features
        </p>
        <div className='w-full'>
          <div className='text-xs ml-2 text-reddish font-semibold my-2'>
            {data.phone.msg}
          </div>
          <input
            type='text'
            name='phone'
            value={data.phone.value}
            disabled={step === 2}
            className={`input-primary ${data.phone.msg ? "border-[1px] border-reddish text-reddish" : "my-2"}`}
            placeholder='Phone Number'
            onChange={(e) => {
              const {name, value} = e.target;
              setData({
                ...data,
                [name]: {
                  msg: "",
                  value,
                },
              });
            }}
            onKeyDown={(e) => e.key === "Enter" && getLoginCode()}
          />
        </div>
        {step === 1 ? (
          <>
            <button
              className='btn-primary w-full mt-5 py-3'
              onClick={getLoginCode}>
              Get Code
            </button>
            <div className='flex justify-center items-center gap-10 sm:text-sm sm:gap-4 mt-8'>
              <p>Not a member yet?</p>
              <p
                className='cursor-pointer hover:underline'
                onClick={signUpHandler}>
                Sign up
              </p>
            </div>
          </>
        ) : (
          <div>
            <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
              {data.code.msg}
            </div>
            <OtpInput
                value={data.code.value}
                valueLength={4}
                onChangeHandler={onChangeHandler}
                onKeyDownFunction={handleSecondStep}
            />
            <Timer setStep={setStep} />
            <button
              className='btn-primary w-full mt-3 py-3'
              onClick={() => loginTwo.mutate()}>
              Login
            </button>
            <button
              onClick={() => setStep(1)}
              className='text-xs cursor-pointer mt-4 underline'>
              Change Number
            </button>
          </div>
        )}
      </div>
    </>
  );
}
