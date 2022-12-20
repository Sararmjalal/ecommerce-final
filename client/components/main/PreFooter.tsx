import React from "react";
import Image from "next/image";

const PreFooter = () => {
  return (
    <div className='main-container flex-col justify-center items-center mt-auto'>
      <div className='relative w-full h-60 lg:h-[27rem] bg-black'>
        <Image
          src={"/assets/site_images/newsletter-img.png"}
          fill
          className='object-cover opacity-50'
          alt='newsletter-img'
        />
        <div className='absolute w-full grid lg:grid-cols-1 grid-cols-2 items-center justify-center gap-28 lg:gap-0 px-28 md:px-8 sm:py-4'>
          <div className='flex flex-col items-center justify-center h-60'>
            <p className='text-white text-3xl leading-[50px] lg:text-center'>
              Subscribe to our newsletter and receive exclusive offers every
              week
            </p>
          </div>
          <div className='flex lg:flex-col justify-center items-center gap-5'>
            <input
              type='text'
              className='input-primary w-[90%] m-auto'
              placeholder='Enter your e-mail'
            />
            <button className='btn-primary'>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
