import React from "react";
import {Pill} from "../../lib/interfaces";

const PillCard = (props: Pill) => {
  return (
    <div className='md:hidden flex items-center justify-center gap-7 lg:gap-0'>
      <div className='w-10 h-10 rounded-lg bg-secondary flex justify-center items-center'>
        {props.icon}
      </div>
      <div className='flex flex-col justify-start gap-2'>
        <p className='font-semibold'>{props.title}</p>
        <p className='text-xs text-grayish w-[70%]'>{props.desc}</p>
      </div>
    </div>
  );
};

export default PillCard;
