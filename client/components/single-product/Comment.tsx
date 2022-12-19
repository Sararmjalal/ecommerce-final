import React from "react";
import {CommentShape} from "../../lib/interfaces";
import Image from "next/image";

const Comment = (props: CommentShape) => {
  return (
    <div className='flex justify-center items-start gap-6 w-full mb-10'>
      <div className='relative w-12 h-12 rounded-full'>
        <Image src={props.pic} fill alt='profile-pic' className='absolute' />
      </div>
      <div className='flex justify-start items-center w-[70%]'>
        <div className='flex flex-col'>
          <p>{props.user}</p>
          <p>{props.rate}</p>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
