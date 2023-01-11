import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { DashboardListProps } from "../../lib/interfaces";
import CategoryInfo from "./categories/Info";
import UserInfo from "./user/UserInfo";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ListItem = ({ _id, title, isProduct = false, isCategory = false, isUser = false, img }: DashboardListProps) => {
  
  const [open, setOpen] = useState({
    category: false,
    user:false
  })
  
  return (
    <div>
      <div className='flex flex-wrap gap-6 items-center bg-gray-100 my-2 p-4 rounded-xl border-[1px] border-gray-200'>
        {
          isProduct &&
            <div className='relative w-24 h-24'>
              <Image
                className="object-cover rounded-full"
                alt='dashboard list image'
                fill
                src={img ? `${process.env.SERVER}/${img}` : `/assets/images/default.svg`}/>
            </div>
        }
        <div className={!isProduct ? 'w-[calc(100%-56px)]' : 'w-[calc(100%-176px)]'}>
          <p className='font-light w-max'>{title}</p>
        </div>
        <div className="w-8 text-right">
          {
            isProduct ?
                <Link href={{
                  pathname: '/admin/dashboard/product/edit/[_id]',
                  query: {_id}
                }}>
                  Edit
                </Link>
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