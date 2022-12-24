import React from "react";
import Image from "next/image";
import {AiOutlineClose, AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";

const CartItemCard = (props) => {
  console.log(props);
  return (
    <div className='grid grid-cols-12 gap-4 w-full text-center items-center my-4 border-[1px] border-grayborder rounded-lg p-2'>
      <div className=' col-span-4 md:col-span-12 '>
        <div className='flex items-center gap-10'>
          <div className='relative object-cover w-16 h-16'>
            <Image
              src={props.image}
              alt={props.title}
              fill
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col items-start text-start'>
            <p>{props.title}</p>
            <p className='text-grayish text-sx font-light'>#{props.id}</p>
          </div>
        </div>
      </div>
      <div className=' col-span-2 md:col-span-4'>
        <p>{props.color}</p>
      </div>
      <div className=' col-span-1 md:col-span-2'>
        <p>{props.size}</p>
      </div>
      <div className=' col-span-3 md:col-span-6'>
        <div className='flex justify-between mx-auto items-center px-7 md:px-2 py-3 w-32 md:w-20 h-12 border-[1px] border-grayborder rounded-full'>
          <AiOutlineMinus cursor={"pointer"} />
          <p className='font-bold'>{props.ammount}</p>
          <AiOutlinePlus cursor={"pointer"} />
        </div>
      </div>
      <div className=' col-span-1 md:col-span-3'>
        <p>${props.price * props.ammount}</p>
      </div>
      <div className=' col-span-1 md:col-span-3'>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default CartItemCard;
