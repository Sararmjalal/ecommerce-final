import React from "react";
import {MdOutlineStickyNote2} from "react-icons/md";
import {TfiRulerPencil} from "react-icons/tfi";

const Description = () => {
  return (
    <div className='main-container'>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-20'>
        <div className='col-span-1 flex flex-col items-center justify-between gap-9 md:gap-4'>
          <MdOutlineStickyNote2 className='w-14 h-16 text-grayish' />
          <p className='font-semibold'>Details and product description</p>
          <p className='text-sm  md:text-center'>
            White Summer Vibes T-shirt in the uiKit line with a colorful print.
            Made of jersey cotton. T-shirt fits perfectly with jeans, pants or
            shorts.
          </p>
        </div>
        <div className='col-span-1 flex flex-col items-center justify-between gap-9 md:gap-4'>
          <TfiRulerPencil className='w-14 h-16 text-grayish' />
          <p className='font-semibold'>Details and product description</p>
          <p className='text-sm'>Body: 98% COTTON - 2% ELASTANE</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
