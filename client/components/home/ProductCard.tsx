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
        </div>
        <p className='mt-7 md:mt-2'>{props.title}</p>
        <div className='flex justify-start items-center gap-9'>
          <p className='text-xl'>
            ${props.price}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
