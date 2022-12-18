import React from "react";
import {Pill} from "../../lib/interfaces";

const WhyChooseUsCard = (props: Pill) => {
  return (
    <div className='flex flex-col justify-start '>
      <div
        className='w-16 h-16 rounded-lg flex justify-center items-center'
        style={
          props.title.includes("Payment")
            ? {backgroundColor: "#FFF3DF"}
            : {backgroundColor: "#F6F6F6"}
        }>
        {props.icon}
      </div>
      <p className='font-semibold mt-8 lg:mt-3'>{props.title}</p>
      <p className='text-xs text-grayish mt-5 lg:mt-2 lg:w-[70%] text-justify'>
        {props.desc}
      </p>
    </div>
  );
};

export default WhyChooseUsCard;
