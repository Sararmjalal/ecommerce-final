import React from "react";
import Image from "next/image";
import {BsFillArrowUpCircleFill} from "react-icons/bs";

const AddComment = () => {
  return (
    <div className='w-full mt-4'>
      <div className='flex  items-center gap-4'>
        <div className='relative w-12 h-12 flex justify-center items-center rounded-full'>
          <Image
            src={"/assets/site_images/profile-1.png"}
            width={48}
            height={48}
            alt='profile-pic'
            className='absolute'
          />
        </div>
        <div className='relative w-full'>
          <input
            type='text'
            name=''
            id=''
            className='input-primary'
            placeholder='Your opinion'
          />
          <BsFillArrowUpCircleFill
            size={35}
            cursor={"pointer"}
            className='absolute right-2 bottom-[13%] hover:text-grayish transition-all text-grayish'
          />
        </div>
      </div>
    </div>
  );
};

export default AddComment;
