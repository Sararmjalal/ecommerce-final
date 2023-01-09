import React, { useState} from "react";
import ReactStars from "react-stars";
import {AiOutlineUser} from "react-icons/ai";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCommentBody, AddRateBody, Comment, Product } from "../../lib/interfaces";
import { submitComment, comments, submitRate } from "../../apis";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../global-state/slice";
import { queryClient } from "../../pages/_app";

const Reviews = ({ product }: { product: Product }) => {

  const [commentsData, setCommentsData] = useState({
    commentText: '',
    score: 0,
    openCommentSection: false
  })

  const thisUser = useSelector(selectUser);

  const { data: allComments } = useQuery({
    queryKey:['comments', `${product._id}`],
    queryFn: async () => await comments(product._id),
  })
  
  const addComment = useMutation({
    mutationFn: async (comment: AddCommentBody) => await submitComment(comment),
    onError: (error: AxiosError | unknown) => {
      if (error instanceof AxiosError) {
        const {msg} = error.response?.data;
        if (msg === "bad request: bad inputs") toast.error('Your Comment is empty!')
      }
    },
  })

  const addRate = useMutation({
    mutationFn: async (rate: AddRateBody) => await submitRate(rate),
    onError: () => toast.info('Rate this product if you feel like it.')
  })

  const onSubmit = () => {
    setCommentsData({...commentsData, openCommentSection:false})
    addComment.mutate({
      productId: product._id,
      text: commentsData.commentText
    },
      {
        onSuccess: () => {
          addRate.mutate({
            productId: product._id,
            score: commentsData.score
          })
          toast.success('Your Comment Added Successfully!')
          queryClient.invalidateQueries({ queryKey: ['comments', `${product._id}`] })
      }})
  }

  console.log(allComments)

  return (
    <div className='main-container '>
      <div className='grid grid-cols-3 md:grid-cols-1 gap-8 xl:gap-24 md:gap-20 w-full flex-wrap'>
        <div className='md:col-span-3 col-span-1 '>
          <div className=' flex flex-col justify-center items-center'>
            <p className='text-6xl font-semibold'>{product.averageScore}</p>
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={product.averageScore}
              edit={false} />
            <div className='flex items-center gap-2'>
              <AiOutlineUser className='text-grayish' />
              <p className='text-grayish'>
                {allComments?.length ? `${allComments.length} Opinions` : 'No Opinions'}
              </p>
            </div>
            <button
              onClick={() => setCommentsData({...commentsData, openCommentSection: !commentsData.openCommentSection})}
              className='btn-primary mt-12 py-3 md:mt-6'>
              Add Opinion
            </button>
            {commentsData.openCommentSection && thisUser &&
              (<div>
                <AddComment
                  onSubmit={onSubmit}
                  commentsData = {commentsData}
                  setCommentsData={setCommentsData} />
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Rate this product:</p>
                  <ReactStars
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  value={commentsData.score}
                  onChange={(newValue: number) => {setCommentsData({...commentsData, score: newValue})}} />
                </div>
              </div>) 
            }
            {!commentsData.openCommentSection && !thisUser && <p className="text-xs text-reddish">Only E-commerce users can submit comments!</p>} 
          </div>
        </div>
        <div className='md:col-span-3 col-span-2 '>
          {allComments?.length ? (
            allComments.map((comment: Comment) => (
              <CommentCard
                key={comment._id}
                user={comment.userId}
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
