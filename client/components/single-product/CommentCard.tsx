import React from "react";
import {CommentShape, ThisUser} from "../../lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../apis";

const CommentCard = ({ user, text}: CommentShape) => {
  const {data: users} = useQuery(['users'],{
    queryFn: async () => await allUsers(""),
  })

  const thisUser = users?.data.find((item: ThisUser) => item._id === user)

  return (
    <div className='flex justify-center items-start gap-6 w-full mb-10'>
      <div className='relative w-12 h-12 rounded-full'>
        <p className="font-semibold text-primary">{ thisUser?.name}</p>
      </div>
      <div className='flex justify-start items-center w-[70%]'>
        <div className='flex flex-col'>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
