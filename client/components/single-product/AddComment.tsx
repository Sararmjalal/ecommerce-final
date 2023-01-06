import React from "react";
import {BsFillArrowUpCircleFill} from "react-icons/bs";
import { AddCommentProps } from "../../lib/interfaces";

const AddComment = ({onSubmit, commentsData, setCommentsData} : AddCommentProps ) => {

  return (
    <div className='w-full mt-4'>
      <div className='flex  items-center gap-4'>
        <div className='relative w-full'>
          <input
            type='text'
            name=''
            id=''
            className='input-primary'
            placeholder='Your opinion'
            onChange={(e) => setCommentsData({...commentsData, commentText:e.target.value})}
          />
          <BsFillArrowUpCircleFill
            onClick={onSubmit}
            size={35}
            cursor={"pointer"}
            className='absolute right-2 bottom-[13%] transition-all text-grayish hover:text-primary'
          />
        </div>
      </div>
    </div>
  );
};

export default AddComment;
