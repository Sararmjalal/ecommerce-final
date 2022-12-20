import React from "react";
import Image from "next/image";
import {ProductCards} from "../../lib/interfaces";

const ProductCard = (props: ProductCards) => {
  return ( 
    <>
      <div className='flex flex-col justify-start items-start w-full '>
        <div className='relative h-[385px] w-full bg-black'>
          <Image
            src={props.img}
            alt={props.title}
            fill
            className='absolute object-cover object-top'
          />
          {props.badge && <div className='badge-red absolute m-6'>30%</div>}
        </div>
        <p className='mt-7 md:mt-2'>{props.title}</p>
        <div className='flex justify-start items-center gap-9'>
          <p
            className='text-xl'
            style={props.badge ? {color: "#FF0000"} : {color: "black"}}>
            ${props.price}
          </p>
          <p className='text-xl text-grayish'>
            {props.lastPrice && props.lastPrice}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
