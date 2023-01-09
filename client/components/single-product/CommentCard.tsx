import React from "react";
import {CommentShape, ThisUser} from "../../lib/interfaces";
import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../../apis";
import Image from "next/image";

const CommentCard = ({ user, text}: CommentShape) => {
  const {data: users} = useQuery(['users'],{
    queryFn: async () => await allUsers(""),
  })

  const thisUser = users?.data.find((item: ThisUser) => item._id === user)
  console.log(thisUser)

  return (
    <div className='flex justify-center items-start gap-6 w-full mb-4 py-6 max-w-[600px] rounded-2xl bg-gray-50 shadow-md'>
      <div className='relative w-16 h-16 rounded-full'>
        <Image
          fill
          className="object-cover rounded-full"
          alt='user image'
          src='/assets/images/user-default.webp'
        />
      </div>
      <div className='flex justify-start items-center w-[calc(100%-140px)]'>
        <div className='flex flex-col'>
        <p className="font-semibold text-primary">{ thisUser?.name}</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
