import React from "react";

const ColorCard = ({color}: any) => {
  return (
    <div className='color-badge '>
      <div
        className='absolute  w-[70%] border-[1px] border-grayish h-[70%]'
        style={{backgroundColor: color}}></div>
    </div>
  );
};

export default ColorCard;
