import React, {useState} from "react";
import OtpInput from "../../components/main/OtpInput";
import {postRequest} from "../../apis/baseConfig";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [adminPhone, setAdminPhone] = useState("");

  const onChangeHandler = (value: string) => setAdminPhone(value);

  const verifyAdminPhone = async () => {
    try {
      const res = await postRequest("admin/login-step-one", {
        phone: adminPhone,
      });
      toast.success("welcome");
      console.log(res);
    } catch (error: any) {
      console.log(adminPhone);
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
              value={adminPhone}
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
