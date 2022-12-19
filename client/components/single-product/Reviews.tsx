import React, {useState} from "react";
import ReactStars from "react-stars";
import {AiOutlineUser} from "react-icons/ai";
import {commentData} from "../../lib/staticData";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Reviews = () => {
  const [commentSection, setCommentSection] = useState(false);
  return (
    <div className='main-container '>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-32 xl:gap-24 md:gap-20 w-full flex-wrap'>
        <div className='md:col-span-2 '>
          <div className=' flex flex-col justify-center items-center'>
            <p className='text-6xl font-semibold'>4.5</p>
            <ReactStars count={5} size={24} color2={"#ffd700"} />
            <div className='flex items-center gap-2'>
              <AiOutlineUser className='text-grayish' />
              <p className='text-grayish'>81 opinions</p>
            </div>
            <button
              onClick={() => setCommentSection(!commentSection)}
              className='btn-primary mt-12 md:mt-6'>
              Add Opinion
            </button>
            {commentSection && <AddComment />}
          </div>
        </div>
        <div className='md:col-span-2 '>
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
