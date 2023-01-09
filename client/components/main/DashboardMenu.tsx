import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { DashboardMenuProps } from "../../lib/interfaces";
import ConfirmModal from "../modals/Confirm";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const DashboardMenu = ({ menu, logoutFunc }: DashboardMenuProps) => {
  
  const [handleOnClicks, setHandleOnClicks] = useState({
    openMenu: false,
    openConfirm: false
  })

  const router = useRouter()
  const thisColor = menu[0].path === '/admin/dashboard' ? "black" : "#FBB03B"
  const thisClass = menu[0].path === '/admin/dashboard' ? "admin-dashboard-menu" : "user-dashboard-menu"
  const activeStyle = {background: thisColor, fontWeight: 500, color: "white", border:thisColor}

  return (
    <div className='absolute md:static md:mb-5 top-0 left-0 md:w-full w-[300px]'>
      <div
        className={`${thisClass} ${!handleOnClicks.openMenu ? "md:shadow-md" : ""} border-t-[1px] flex justify-between items-center`}
        style={router.asPath === menu[0].path ? activeStyle : {}}
        onClick={() => {
          setHandleOnClicks({ ...handleOnClicks, openMenu: !handleOnClicks.openMenu });
        }}>
        <Link href={menu[0].path}>
          <p className='cursor-pointer'>{menu[0].name}</p>
        </Link>
        <div className='md:block hidden cursor-pointer'>
          {handleOnClicks.openMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
      <ul
        className='w-full flex flex-col md:hidden'
        style={handleOnClicks.openMenu ? {display: "flex"} : {}}>
        {menu.slice(1).map(({name, path}) => {
          return (
            <Link href={path} key={path}>
              <li
                style={router.asPath === path ? activeStyle : {}}
                className={thisClass}
                onClick={() =>
                  setHandleOnClicks({...handleOnClicks, openMenu: false})
                }>
                {name}
              </li>
            </Link>
          );
        })}
        <li
          className={thisClass}
          onClick={() =>
            setHandleOnClicks({...handleOnClicks, openConfirm: true})
          }>
          Logout
        </li>
      </ul>
      {handleOnClicks.openConfirm && (
        <ConfirmModal
          mode='logout'
          closeHandler={() =>
            setHandleOnClicks({...handleOnClicks, openConfirm: false})
          }
          okHandler={logoutFunc}
        />
      )}
    </div>
  );
}

export default DashboardMenu