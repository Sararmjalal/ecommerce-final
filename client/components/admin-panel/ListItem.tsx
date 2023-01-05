import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Image from "next/image";
import CategoryInfo from "./categories/Info";
import UserInfo from "./user/UserInfo";
import { useState } from "react";
import Link from "next/link";
import { DashboardListProps } from "../../lib/interfaces";

const ListItem = ({ _id, title, isProduct = false, isCategory = false, isUser = false, img }: DashboardListProps) => {
  
  const [open, setOpen] = useState({
    category: false,
    user:false
  })
  
  return (
    <div>
      <div className='grid grid-cols-3 bg-gray-100 py-6 my-2 px-4 rounded-xl border-[1px] border-gray-200'>
        {
          img &&
          <div className='col-span-1 relative w-24 h-24'>
          <Image
            alt='dashboard list image'
            fill
            src={img ? `${process.env.SERVER}/${img}` : `/assets/images/default.svg`}
          />
         </div>
        }
        <div className={!img ? 'col-span-2' : 'col-span-1'}>
          <p className='font-light w-max'>{title}</p>
        </div>
        <div className="col-span-1 ">
          {
            isProduct ?
              <div className="w-full flex gap-2 items-end">
                <Link href={{
                  pathname: '/admin/dashboard/product/edit/[_id]',
                  query: {_id}
                }}>
                  Edit
                </Link>
                <span>|</span>
                <p>Remove</p>
              </div>
              :
              <div className="p-1 rounded-full bg-black border-gray-200 w-max ml-auto cursor-pointer">
                 {
                  isCategory && !isProduct && open.category &&
                  <MdExpandLess onClick={() => setOpen({...open, category:false })} color="#f3f4f6" />
                }
                {
                  isUser && !isProduct && open.user &&
                  <MdExpandLess onClick={() => setOpen({...open, user:false })} color="#f3f4f6" />
                }
                {
                  isCategory && !isProduct && !open.category &&
                  <MdExpandMore onClick={() => setOpen({...open, category:true })} color="#f3f4f6" />
                }
{
                  isUser && !isProduct && !open.user &&
                  <MdExpandMore onClick={() => setOpen({...open, user:true })} color="#f3f4f6" />
                }
              </div>
          }
          </div>
          {isCategory && open.category && <CategoryInfo />}
          {!isCategory && !isProduct && open.user && <UserInfo />}
      </div>
  </div>
);
}

export default ListItem