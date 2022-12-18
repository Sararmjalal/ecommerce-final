import React from "react";
import {AiOutlineClose} from "react-icons/ai";
import {FaRegEyeSlash} from "react-icons/fa";

const Signup = ({closeHandler, loginHandler}: any) => {
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
        <div className='relative w-full'>
          <input
            type='text'
            className='input-primary mt-6'
            placeholder='First Name'
          />
        </div>
        <div className='relative w-full'>
          <input
            type='text'
            className='input-primary mt-3 '
            placeholder='Last Name'
          />
        </div>
        <div className='relative w-full'>
          <input
            autoComplete='off'
            type='text'
            className='input-primary mt-3 '
            placeholder='E-mail'
          />
        </div>
        <div className='relative w-full'>
          <input
            autoComplete='off'
            type='password'
            className='input-primary mt-3'
            placeholder='Password'
          />
          <FaRegEyeSlash
            cursor={"pointer"}
            className='absolute right-5 top-[50%] hover:text-grayish transition-all'
          />
        </div>
        <div className='flex justify-start items-center gap-4 mt-2'>
          <input type='checkbox' />
          <p>I agree to the Google Terms of Service and Privacy Policy</p>
        </div>
        <button className='btn-primary w-full mt-3 py-4'>Sign up</button>
        <div className='flex justify-center items-center gap-10 sm:text-sm sm:gap-4 mt-4'>
          <p>Already a member?</p>
          <p className='cursor-pointer hover:underline' onClick={loginHandler}>
            Log in
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
