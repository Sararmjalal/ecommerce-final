import React from "react";
import Image from "next/image";
import {Banner} from "../../lib/interfaces";

const BannerCard = (props: Banner) => {
  return (
    <div
      className={`relative h-[373px] object-cover bg-black ${
        props.img.includes("banner-1") ? "w-1/2 xl:w-full" : "w-1/4 xl:w-full"
      }`}>
      <Image
        src={props.img}
        alt={props.title}
        fill
        className='opacity-70 object-cover object-top'
      />
      <div className='absolute flex flex-col justify-start text-white text-md left-14 bottom-20'>
        {props.badge ? (
          <div className='badge-red w-max mb-[15px]'>50%</div>
        ) : null}
        <p className='text-2xl max-w-[139px] mb-[41px]'>{props.title}</p>
        <button className='btn-secondary bg-white py-[15px] px-[32px]'>{props.button}</button>
      </div>
    </div>
  );
};

export default BannerCard;
