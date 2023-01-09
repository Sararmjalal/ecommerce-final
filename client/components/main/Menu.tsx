import { menuItems } from "../../lib/staticData";
import { Category } from "../../lib/interfaces";
import { useRouter } from "next/router";

const Menu = ({ closeHandler, categories }: {closeHandler: () => void, categories: Category[]}) => {

  const router = useRouter()

  return (
    <div className="relative">
      <div className={`${router.asPath !== '/' ? 'top-0' : 'top-[100px]'} absolute py-9 flex-wrap md:px-6 md:justify-between flex px-48 gap-10 w-full bg-white z-[999] shadow-md border-t-[1px] border-grayborder`}
        onMouseLeave={closeHandler}>
        {menuItems.map((branch, i, ref) => (
          <div
            key={branch.id}
            className='flex-1 flex flex-col items-start justify-start'>
            <p className='mb-6 xs:text-sm'>{branch.title}</p>
              {branch.items.map((item) => (
            <p className='w-[120px] text-xs mb-4'>{item}</p>
          ))}
          </div>
          ))
        }
      </div>
    </div>
  );
};
export default Menu;
