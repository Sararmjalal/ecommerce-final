import {selectUser, setCurrentCart, setCurrentUser} from "../../global-state/slice";
import {userSignupOne, userSignupTwo, userInfo, myCart} from "../../apis";
import {handleEmptyFields, setToken} from "../../lib";
import {useSelector, useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {AiOutlineClose} from "react-icons/ai";
import {Form} from "../../lib/interfaces";
import { useRouter } from "next/router";
import {toast} from "react-toastify";
import OtpInput from "./OtpInput";
import {AxiosError} from "axios";
import {useState} from "react";
import Timer from "./Timer";

const Signup = ({ closeHandler, loginHandler }: any) => {
  
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter()

  const onChangeHandler = (value: string) => setData({...data, code: {...data.code, value}});

  const [data, setData] = useState<Form>({
    phone: {
      msg: "",
      value: "",
    },
    name: {
      msg: "",
      value: "",
    },
    code: {
      msg: "",
      value: "",
    },
  });

  const signUpOne = useMutation({
    mutationFn: async () => await userSignupOne(data.phone.value, data.name.value),
    onSuccess: () => setStep(step + 1),
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const {msg} = error.response?.data;
        if (msg === "this user already exists in the database")
          return setData({ ...data, phone: { ...data.phone, msg: "You're already a member lool" } })
          setData({...data, phone:{...data.phone, msg: "Please enter a valid phone number"}})
      }
    },
  });

  const signUpTwo = useMutation({
    mutationFn: async () =>
      await userSignupTwo(data.phone.value, data.code.value),
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

  const getRegCode = () => {
    const isEmpty = Object.entries(data).some(([key, val]) => {
      if (key !== "code") return !val.value;
    });
    if (!isEmpty) return signUpOne.mutate();
    const clone = {...data};
    setData({
      code: {
        value: "",
        msg: "",
      },
      phone: handleEmptyFields(clone)["phone"],
      name: handleEmptyFields(clone)["name"],
    });
  };

  const handleSecondStep = () => {
    return data.code.value.length === 4
      ? signUpTwo.mutate()
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
        <p className='text-black font-semibold text-xl mt-6 text-center'>
          Create an account and discover the benefits
        </p>
        <p className='text-grayish text-sm text-center mt-2'>
          By signing up to ecommerce you are able to shop and use all the
          features of this website.
        </p>
        <div className='w-full'>
          <div className='text-xs ml-2 text-reddish font-semibold mb-2 mt-4'>
            {data.name.msg}
          </div>
          <input
            type='text'
            name='name'
            disabled={step === 2}
            value={data.name.value}
            className={`input-primary ${
              data.name.msg
                ? "border-[1px] border-reddish text-reddish mt-0 mb-2"
                : "my-2"
            }`}
            placeholder='Name'
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
            onKeyDown={(e) => e.key === "Enter" && getRegCode()}
          />
        </div>
        <div className=' w-full'>
          <div className='text-xs ml-2 text-reddish font-semibold mb-2'>
            {data.phone.msg}
          </div>
          <input
            type='text'
            name='phone'
            disabled={step === 2}
            value={data.phone.value}
            className={`input-primary ${
              data.phone.msg
                ? "border-[1px] border-reddish text-reddish mt-0 mb-2"
                : "my-2"
            }`}
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
            onKeyDown={(e) => e.key === "Enter" && getRegCode()}
          />
        </div>
        {step === 1 ? (
          <div className="w-full">
            <button
              className='btn-primary w-full mt-3 py-3'
              onClick={getRegCode}>
              Get Code
            </button>
            <div className='flex justify-center items-center gap-10 sm:text-sm sm:gap-4 mt-4'>
              <p>Already a member?</p>
              <p
                className='cursor-pointer hover:underline'
                onClick={loginHandler}>
                Log in
              </p>
            </div>
          </div>
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
              onClick={() => signUpTwo.mutate()}>
              Sign up
            </button>
            <button
              onClick={() => setStep(1)}
              className='underline text-xs cursor-pointer mt-4'>
              Change Number
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
