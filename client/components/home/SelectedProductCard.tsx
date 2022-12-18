import React from "react";
import Image from "next/image";
import {SelectedProduct} from "../../lib/interfaces";

const SelectedProductCard = (props: SelectedProduct) => {
  return (
    <>
      <div className='flex flex-col justify-start items-start w-full '>
        <div className='relative h-[50vh] w-full bg-black'>
          <Image
            src={props.img}
            alt={props.title}
            fill
            className='absolute object-cover'
          />
          {props.badge ? <div className='badge-red absolute'>30%</div> : null}
        </div>
        <p className='text-xs md:text-base mt-7 md:mt-2'>{props.title}</p>
        <div className='flex justify-start items-center gap-6'>
          <p
            className='text-sm md:text-lg'
            style={props.badge ? {color: "#FF0000"} : {color: "black"}}>
            ${props.price}
          </p>
          <p className='text-sm text-grayish'>
            {props.lastPrice ? props.lastPrice : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default SelectedProductCard;
