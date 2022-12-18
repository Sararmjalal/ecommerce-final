import React from "react";
import Image from "next/image";
import {Banner} from "../../lib/interfaces";

const BannerCard = (props: Banner) => {
  return (
    <div
      className='relative h-[30vh] object-cover bg-black'
      style={
        props.img.includes("banner-1") ? {width: "280px"} : {width: "200px"}
      }>
      <Image
        src={props.img}
        alt={props.title}
        fill
        objectFit='cover'
        className='opacity-70'
      />
      <div className='absolute flex flex-col justify-start gap-5 text-white text-md left-8 top-20 w-[50%]'>
        {props.badge ? (
          <div className='badge-red top-[-40%] absolute'>50%</div>
        ) : null}
        <p>{props.title}</p>
        <button className='btn-secondary'>{props.button}</button>
      </div>
    </div>
  );
};

export default BannerCard;
