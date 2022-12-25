import {AiOutlineClose} from "react-icons/ai";
import {FaFacebookF} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUser, setCurrentUser} from "../../global-state/slice";
import {userLoginOne} from "../../apis";
import {useMutation} from "@tanstack/react-query";
import {Form} from "../../lib/interfaces";
import {handleEmptyFields} from "../../lib";

export default function Login({closeHandler, signUpHandler, codeHandler}: any) {
  const thisUser = useSelector(selectUser);
  const dispatch = useDispatch();

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

  const getLoginCode = useMutation({
    mutationFn: async () => await userLoginOne(data.phone.value),
    onSuccess: () => console.log("Hoooora!"),
  });

  const userLogin = () => {
    const isEmpty = Object.entries(data).some(([key, val]) => {
      if (key !== "code") return !val.value;
    });
    if (!isEmpty) return getLoginCode.mutate();
    const clone = {...data};
    setData({
      code: {
        value: "",
        msg: "",
      },
      phone: handleEmptyFields(clone)["phone"],
    });
  };

  console.log(data);

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
            onKeyDown={(e) => e.key === "Enter" && userLogin()}
          />
        </div>
        <div className='flex justify-center items-center mt-8 gap-3 w-full'>
          <button className='btn-blue w-[50%]'>
            <FaFacebookF className='sm:hidden' />
            Facebook
          </button>
          <button className='btn-white-red w-[50%]' onClick={() => signIn()}>
            <SiGmail className='sm:hidden' />
            Gmail
          </button>
        </div>
        <button
          className='btn-primary w-full mt-5 py-4'
          onClick={() => {
            userLogin();
            codeHandler();
          }}>
          Get Code
        </button>
        <div className='flex justify-center items-center gap-10 sm:text-sm sm:gap-4 mt-8'>
          <p>Not a member yet?</p>
          <p className='cursor-pointer hover:underline' onClick={signUpHandler}>
            Sign up
          </p>
        </div>
      </div>
    </>
  );
}
