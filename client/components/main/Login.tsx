import {AiOutlineClose} from "react-icons/ai";
import {FaRegEyeSlash, FaFacebookF} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import {signIn} from "next-auth/react";

export default function Login({closeHandler, signUpHandler}: any) {
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
            type='text'
            className='input-primary mt-10 '
            placeholder='E-mail'
          />
        </div>
        <div className='relative w-full'>
          <input
            type='password'
            className='input-primary mt-4'
            placeholder='Password'
          />
          <FaRegEyeSlash
            cursor={"pointer"}
            className='absolute right-5 top-[50%] hover:text-grayish transition-all'
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
        <button className='btn-primary w-full mt-5 py-4'>Sign in</button>
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
