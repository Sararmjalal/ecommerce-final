import { useRouter } from "next/router";
import React from "react";
import {menuItems} from "../../lib/staticData";

const Menu = ({ closeHandler }: { closeHandler: () => void }) => {

  const router = useRouter()
  
  return (
    <div className="relative">
      <div className={`${router.asPath !== '/' ? 'top-0' : 'top-[100px]'} absolute pl-40 lg:pl-20 xs:px-5 pr-[634px] md:pr-[300px] py-9 grid grid-cols-4 sm:grid-cols-2
      sm:h-fit sm:gap-y-20 gap-64 xl:gap-52 lg:gap-44 md:gap-36 xs:gap-20 w-full h-[384px] bg-white z-[999] shadow-md border-t-[1px] border-grayborder`}
        onMouseLeave={closeHandler}>
      {menuItems.map((branch) => (
        <div
          key={branch.id}
          className='col-span-1 flex flex-col items-start justify-start'>
          <p className='mb-6 xs:text-sm'>{branch.title}</p>
          {branch.items.map((item) => (
            <p className='w-[120px] text-xs mb-4'>{item}</p>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};
export default Menu;
