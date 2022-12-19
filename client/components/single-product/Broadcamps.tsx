import React from "react";
import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineLocalShipping} from "react-icons/md";
import {TbTruckDelivery} from "react-icons/tb";

const Broadcamps = () => {
  return (
    <div className='grid grid-cols-2 items-start md:gap-2 w-full md:pr-0'>
      <div className='md:col-span-2 col-span-1 flex items-center md:justify-center gap-5 xs:text-xs'>
        <AiOutlineHome size={15} className='text-grayish' />
        <p className='text-grayish'>/</p>
        <p className='text-grayish'>Men</p>
        <p>T-Shirt Summer Vibes</p>
      </div>
      <div className='md:col-span-2 col-span-1 grid grid-cols-2 items-center gap-4 md:gap-8 md:max-w-[505px] md:mx-auto md:mt-4 md:mb-2'>
        <div className='flex items-center gap-7 xs:gap-2'>
          <MdOutlineLocalShipping size={18} />
          <div className='flex flex-col h-8'>
            <p className='font-semibold text-xs'>Standard shipment</p>
            <p className='font-light text-xs'>Free within 3-6 Business days</p>
          </div>
        </div>
        <div className='flex items-center gap-7 xs:gap-2'>
          <TbTruckDelivery size={18} />
          <div className='flex flex-col h-8 '>
            <p className='font-semibold text-xs'>Express Delivery</p>
            <p className='font-light text-xs'>$3,500 available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcamps;
