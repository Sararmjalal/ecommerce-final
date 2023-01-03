import { MdExpandMore } from "react-icons/md";
import Image from "next/image";
import CategoryInfo from "./category/Info";
import UserInfo from "./user/UserInfo";
import { useState } from "react";
import Link from "next/link";

const ListItem = ({ item, name }: { item: any, name: string }) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <div className={`grid grid-cols-3 bg-gray-100 py-6 my-2 px-4 rounded-xl border-[1px] border-gray-200`}>
        {
          name !== 'categories' &&
          <div className='col-span-1 relative w-full h-24'>
          <Image
            alt={`${name} image`}
            fill
            src={item.images ? `${process.env.server}${item.images[0]}` : '/default.svg'}
          />
        </div>
        }
        <div className={name === 'categories' ? 'col-span-2' : 'col-span-1'}>
          <p className='font-light w-max'>
            { name === 'products' ? item.title : item.name }
          </p>
        </div>
        <div className="col-span-1 ">
          {
            name === 'products' ?
              <div className="w-full flex gap-2 items-end">
                <Link href={{
                  pathname: '/admin/dashboard/edit-product/[_id]',
                  query:{_id: item._id}
                }}>
                  Edit
                </Link>
                <span>|</span>
                <p>Remove</p>
              </div>
              :
              <div className="p-1 rounded-full bg-black border-gray-200 w-max ml-auto cursor-pointer">
                <MdExpandMore onClick={() => setOpen(!open)} color="#f3f4f6"/>
              </div>
          }
          </div>
          {name === 'categories' && open && <CategoryInfo />}
          {name === 'users' && open && <UserInfo />}
      </div>
  </div>
);
}

export default ListItem