import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import PreFooter from "./PreFooter";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <PreFooter />
      <div
        className='main-container grid grid-cols-10 md:grid-cols-4 gap-11 w-full sm:text-center bg-white border-b-[1px] border-grayborder mt-auto'>
        <div className='col-span-4 md:col-span-4 '>
          <div className='flex flex-col justify-start gap-7'>
            <div className='flex items-center gap-6'>
              <Image
                src={"/assets/icons/logo-black.png"}
                width={45}
                height={35}
                alt='logo'
              />
              <p className='text-lg font-bold'>
                <span className='text-primary'>E-</span>Shop
              </p>
            </div>
            <p className='text-grayish text-sm leading-7 mb-4'>
              House My Brand designs clothing for the young, the old & everyone
              in between - but most importantly, for the fashionable
            </p>
            <div className='flex items-center gap-8'>
              <FaFacebookF size={17} color={"#A8A8A8"} cursor={"pointer"} />
              <FaTwitter size={17} color={"#A8A8A8"} cursor={"pointer"} />
              <FaLinkedinIn size={17} color={"#A8A8A8"} cursor={"pointer"} />
              <FaInstagram size={17} color={"#A8A8A8"} cursor={"pointer"} />
              <FaYoutube size={17} color={"#A8A8A8"} cursor={"pointer"} />
            </div>
          </div>
        </div>
        <div className='col-span-2 sm:col-span-4'>
          <div className='flex flex-col justify-start gap-2 text-sm'>
            <p className='mb-6'>Shopping Online</p>
            <p>Older Status</p>
            <p>Shipping and Delivery</p>
            <p>Returns</p>
            <p>Payment Options</p>
            <p>Contact Us</p>
          </div>
        </div>
        <div className='col-span-2 sm:col-span-4'>
          <div className='flex flex-col justify-start gap-2 text-sm'>
            <p className='mb-6'>Information</p>
            <p>Gift Cards</p>
            <p>Find a store</p>
            <p>Newsletter</p>
            <p>Become a member</p>
            <p>Site feedback</p>
          </div>
        </div>
        <div className='col-span-2 sm:col-span-4'>
          <div className='flex flex-col justify-start gap-2 text-sm'>
            <p className='mb-6'>Contact</p>
            <p>store@uikit.com</p>
            <p>Hotline: +1 131 138 138</p>
          </div>
        </div>
      </div>
      <div className='w-full py-8 bg-white text-grayish text-xs text-center'>
        <p>
          DESIGN BY ICEO.CO & DEVELOPED BY HAMIDREZA & JALAL WITH NEXT JS - ©
          2022. ALL RIGHTS RESERVED.
        </p>
      </div>
    </>
  );
};

export default Footer;
