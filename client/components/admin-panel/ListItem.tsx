import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { DashboardListProps } from "../../lib/interfaces";
import CategoryInfo from "./categories/Info";
import UserInfo from "./user/UserInfo";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ListItem = ({ _id, title, isProduct = false, isCategory = false, isUser = false, img, categories, users }: DashboardListProps) => {
  
  const [open, setOpen] = useState({
    category: false,
    user:false
  })
   
  return (
    <div>
      <div className='flex flex-wrap gap-6 items-center my-4 px-4 py-5 rounded-xl bg-gray-100'>
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
          <p className='w-max text-lg'>{title}</p>
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
              <div className="rounded-full bg-black border-gray-200 w-max ml-auto cursor-pointer">
                {
                  isCategory && !isProduct && open.category &&
                  <div onClick={() => setOpen({ ...open, category: false })} className='w-full h-full p-1'>
                    <MdExpandLess color="#f3f4f6" />
                  </div>
                }
                {
                  isUser && !isProduct && open.user &&
                  <div onClick={() => setOpen({ ...open, user: false })} className='w-full h-full p-1'>
                      <MdExpandLess color="#f3f4f6" />
                   </div>   
                }
                {
                  isCategory && !isProduct && !open.category &&
                  <div onClick={() => setOpen({ ...open, category: true })} className='w-full h-full p-1'>
                    <MdExpandMore color="#f3f4f6" />
                  </div>    
                }
                {
                  isUser && !isProduct && !open.user &&
                  <div onClick={() => setOpen({ ...open, user: true })} className='w-full h-full p-1'>
                    <MdExpandMore color="#f3f4f6" />
                  </div>    
                }
              </div>
          }
        </div>
        {isCategory && open.category && categories &&
          <CategoryInfo
            _id={_id}
            categories={categories}/>
        }
          {!isCategory && !isProduct && open.user && users && <UserInfo />}
      </div>
    </div>
  );
}

export default ListItem