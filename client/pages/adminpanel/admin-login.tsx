import React, {useState} from "react";
import OtpInput from "../../components/adminPanel/OtpInput";
import {postRequest} from "../../lib/axiosInstance/axiosBaseConfig";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [phone, setPhone] = useState("");

  const onChangeHandler = (value: string) => setPhone(value);

  const verifyAdminPhone = async () => {
    try {
      await postRequest("admin/login-step-one", {phone});
      toast.success("welcome");
    } catch (error: any) {
      console.log(phone);
      console.log(error);
      if (error.response.data.msg === "bad request: bad input")
        return toast.error("Please enter your phone number!");
      else if (
        error.response.data.msg === "Provided value is not a valid Phone Number"
      )
        return toast.error("Enter a valid phone number!");

      return toast.error(
        "This phone number is not registered as E-commerce admin!"
      );
    }
  };

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='p-5 w-[70%] h-[70%] border-[1px] border-grayish rounded-xl flex flex-col justify-start items-center gap-6'>
          <p className='font-semibold text-center sm:text-sm'>
            Login as Ecommerce Admin
          </p>
          <p className='text-light text-center sm:text-xs'>
            Enter Your Phone Number:
          </p>
          <div className='w-full max-w-[800px] mx-auto my-0 px-5 py-4'>
            <OtpInput
              value={phone}
              valueLength={11}
              onChangeHandler={onChangeHandler}
            />
          </div>
          <button onClick={verifyAdminPhone} className='btn-primary'>
            Get Code
          </button>
        </div>
      </div>
      {}
    </>
  );
};

export default AdminLogin;
