import React, {useState, useLayoutEffect} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import {selectUser, setCurrentUser} from "../../global-state/slice";
import {useMutation} from "@tanstack/react-query";
import {userSignupOne, userSignupTwo, userInfo} from "../../apis";
import {useRouter} from "next/router";
import {Form} from "../../lib/interfaces";
import {handleEmptyFields} from "../../lib";
import OtpInput from "./OtpInput";

const Signup = ({closeHandler, loginHandler}: any) => {
  const thisUser = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const {push} = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const onChangeHandler = (value: string) => setCode(value);

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

  useLayoutEffect(() => {
    thisUser ? push("/") : setLoading(false);
  }, []);

  const signUpOne = useMutation({
    mutationFn: async () =>
      await userSignupOne(data.phone.value, data.name.value),
    onSuccess: () => setStep(step + 1),
  });

  const signUpTwo = useMutation({
    mutationFn: async () =>
      await userSignupTwo(data.phone.value, data.code.value),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const getUserInfo = useMutation({
    mutationFn: async () => await userInfo(),
    onSuccess: (data) => {
      console.log(data);
      // dispatch(setCurrentUser(data))
      // push('/')
    },
  });

  const register = () => {
    const isEmpty = Object.values(data).some((val) => !val.value);
    if (!isEmpty) return signUpOne.mutate();
    const clone = {...data};
    setData(handleEmptyFields(clone));
  };

  if (loading) return <h1>Loading....</h1>;
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
            onKeyDown={(e) => e.key === "Enter" && register()}
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
            onKeyDown={(e) => e.key === "Enter" && register()}
          />
        </div>
        {step === 1 ? (
          <div>
            <div className='flex justify-start items-center gap-4 mt-2'>
              <input type='checkbox' />
              <p>I agree to the Google Terms of Service and Privacy Policy</p>
            </div>
            <button
              className='btn-primary w-full mt-3 py-4'
              onClick={() => setStep(2)}>
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
            <OtpInput
              value={code}
              valueLength={4}
              onChangeHandler={onChangeHandler}
            />
            <button
              className='btn-primary w-full mt-3 py-4'
              onClick={() => setStep(2)}>
              Sign up
            </button>
            <button className='text-reddish text-xs cursor-pointer flex justify-center mt-4'>
              Try Again...
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
