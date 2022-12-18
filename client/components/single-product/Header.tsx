import React from "react";
import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineLocalShipping} from "react-icons/md";
import {TbTruckDelivery} from "react-icons/tb";

const Header = () => {
  return (
    <div className='w-full my-10 sm:mb-20 flex lg:flex-col justify-between items-start gap-20 lg:gap-5 lg:h-8'>
      <div className='flex justify-between items-center w-full'>
        <AiOutlineHome
          size={22}
          cursor={"pointer"}
          className='text-grayish hover:text-black transition-all'
        />
        <p>Men</p>
        <p>T-shirt</p>
        <p>T-shirt Summer Vibes</p>
      </div>
      <div className='flex justify-between items-center w-full gap-4 sm:text-xs'>
        <div className='flex items-center justify-between gap-7 sm:gap-3'>
          <MdOutlineLocalShipping size={18} />
          <div className='flex flex-col justify-start'>
            <p className='font-semibold'>Standard shipment</p>
            <p className='font-light text-sm'>Free within 3-6 business days</p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-7 sm:gap-3'>
          <TbTruckDelivery size={18} />
          <div className='flex flex-col justify-start'>
            <p className='font-semibold'>Express delivery</p>
            <p className='font-light text-sm'>$3,500 available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
