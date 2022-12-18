import React, {useState} from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import {AiOutlineUser} from "react-icons/ai";
import {commentData} from "../../lib/staticData";
import Comment from "./Comment";

const Reviews = () => {
  return (
    <div className='main-container my-20'>
      <div className='w-full flex justify-center items-start gap-6'>
        <div className='flex flex-col items-center justify-start gap-12 w-[50%]'>
          <div className='flex items-center justify-center gap-12'>
            <div className='flex flex-col items-center'>
              <p className='text-6xl font-semibold'>4.5</p>
              <ReactStars count={5} size={24} color2={"#ffd700"} />
              <div className='flex items-center gap-2'>
                <AiOutlineUser className='text-grayish' />
                <p className='text-grayish'>81 opinions</p>
              </div>
            </div>
            <div className='flex flex-col items-center gap-0'>
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={1}
                  value={1}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p>1</p>
                <Image
                  src={"/assets/site_images/line.png"}
                  width={140}
                  height={1}
                  alt='line'
                />
              </div>
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={1}
                  value={1}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p>1</p>
                <Image
                  src={"/assets/site_images/line.png"}
                  width={140}
                  height={1}
                  alt='line'
                />
              </div>
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={1}
                  value={1}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p>1</p>
                <Image
                  src={"/assets/site_images/line.png"}
                  width={140}
                  height={1}
                  alt='line'
                />
              </div>
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={1}
                  value={1}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p>1</p>
                <Image
                  src={"/assets/site_images/line.png"}
                  width={140}
                  height={1}
                  alt='line'
                />
              </div>
              <div className='flex items-center gap-2'>
                <ReactStars
                  count={1}
                  value={1}
                  size={24}
                  color2={"#ffd700"}
                  edit={false}
                />
                <p>1</p>
                <Image
                  src={"/assets/site_images/line.png"}
                  width={140}
                  height={1}
                  alt='line'
                />
              </div>
            </div>
          </div>
          <button className='btn-primary'>Add Opinion</button>
        </div>
        <div className='flex flex-col items-start justify-start gap-6 w-[50%]'>
          {commentData.length ? (
            commentData.map((comment) => (
              <Comment
                key={comment.id}
                user={comment.user}
                pic={comment.pic}
                rate={comment.rate}
                text={comment.text}
              />
            ))
          ) : (
            <p className='text-grayish'>There are no comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
