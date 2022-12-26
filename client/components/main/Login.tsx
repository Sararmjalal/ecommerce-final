import {AiOutlineClose} from "react-icons/ai";
import {FaFacebookF} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUser, setCurrentUser} from "../../global-state/slice";
import {userLoginOne, userLoginTwo, userInfo} from "../../apis";
import {useMutation} from "@tanstack/react-query";
import {Form} from "../../lib/interfaces";
import {handleEmptyFields, setToken} from "../../lib";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import OtpInput from "./OtpInput";
import Timer from "./Timer";

export default function Login({closeHandler, signUpHandler}: any) {
  const thisUser = useSelector(selectUser);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const onChangeHandler = (value: string) =>
    setData({...data, code: {...data.code, value}});

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
        console.log(error);
        const {msg} = error.response?.data;
        if (msg === "Provided value is not a valid Phone Number")
          return toast.error("Please enter a valid phone number.");
        return toast.error("This number is not a member. Please Sign up.");
      }
    },
  });

  const loginTwo = useMutation({
    mutationFn: async () =>
      await userLoginTwo(data.phone.value, data.code.value),
    onSuccess: (res) => {
      // console.log("TOKEN", res);
      setToken(res.data.token, "user");
      getUserInfo.mutate();
    },
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        console.log(error);
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
    onSuccess: (res) => {
      console.log("USER", res);
      dispatch(setCurrentUser(res.data));
      closeHandler();
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
          <div className='text-xs ml-2 text-reddish font-semibold mb-2'>
            {data.phone.msg}
          </div>
          <input
            type='text'
            name='phone'
            value={data.phone.value}
            disabled={step === 2}
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
            onKeyDown={(e) => e.key === "Enter" && getLoginCode()}
          />
        </div>
        {step === 1 ? (
          <>
            <div className='flex justify-center items-center mt-4 gap-3 w-full'>
              <button
                className='btn-white-red w-[50%]'
                onClick={() => signIn()}>
                <SiGmail className='sm:hidden' />
                Gmail
              </button>
            </div>
            <button
              className='btn-primary w-full mt-5 py-4'
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
              className='btn-primary w-full mt-3 py-4'
              onClick={() => loginTwo.mutate()}>
              Sign up
            </button>
            <button
              onClick={() => setStep(1)}
              className='text-reddish text-xs cursor-pointer mt-4'>
              Change Number
            </button>
          </div>
        )}
      </div>
    </>
  );
}
