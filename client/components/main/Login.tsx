import {AiOutlineClose} from "react-icons/ai";
import {FaFacebookF} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {postRequest} from "../../apis/axiosBaseConfig";
import {toast} from "react-toastify";

export default function Login({closeHandler, signUpHandler}: any) {
  const [userPhone, setUserPhone] = useState("");
  console.log(userPhone);

  const verifyUserPhone = async () => {
    try {
      const res = await postRequest("user/login-one", {
        phone: userPhone,
      });
      toast.success("welcome");
      console.log(res);
    } catch (error: any) {
      console.log(userPhone);
      console.log(error);
      if (error.response.data.msg === "bad input")
        return toast.error("Please enter your phone number!");
      if (
        error.response.data.msg === "Provided value is not a valid Phone Number"
      )
        return toast.error("Enter a valid phone number!");
      if (
        error.response.data.msg ===
        "bad request: no such user exists in our database"
      )
        return toast.error("Sign-up first");
      else if (
        error.response.data.msg ===
        "this username already exists in the database"
      )
        return toast.error("This phone number already signed-in!");

      return toast.error(
        "This phone number is not registered as E-commerce admin!"
      );
    }
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
        <div className='relative w-full'>
          <input
            type='number'
            value={userPhone}
            className='input-primary mt-10 '
            placeholder='Phone Number'
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
        <div className='flex md:flex-col md:items-start md:gap-3 justify-between items-center w-full mt-5'>
          <div className='flex justify-center items-center gap-4'>
            <input type='checkbox' />
            <p>Keep me signed in</p>
          </div>
          <p className='text-grayish'>Forgot Password?</p>
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
          onClick={verifyUserPhone}>
          Sign in
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
