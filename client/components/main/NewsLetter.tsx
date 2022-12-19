import React from "react";
import Image from "next/image";

const NewsLetter = () => {
  return (
    <div className='main-container flex-col justify-center items-center'>
      <div className='relative w-full h-60  bg-black '>
        <Image
          src={"/assets/site_images/newsletter-img.png"}
          fill
          className='object-cover opacity-50'
          alt='newsletter-img'
        />
        <div className='absolute w-full flex lg:flex-col justify-between items-center gap-8 lg:gap-3 py-20 lg:py-5 px-28 lg:px-7 '>
          <p className=' text-white text-2xl lg:text-base w-[50%] lg:w-full lg:text-center'>
            Subscribe to our newsletter and receive exclusive offers every week
          </p>
          <div className='flex lg:flex-col w-[50%] justify-center items-center gap-5'>
            <input
              type='text'
              className='input-primary md:h-6'
              placeholder='Enter your e-mail'
            />
            <button className='btn-primary md:h-6'>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
