import React, {useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu, AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import Login from "../modals/SignIn";
import Menu from "./Menu";
import CartModal from "../cart/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentUser, selectAdmin, selectUser } from "../../global-state/slice";
import ConfirmModal from "../modals/Confirm";
import UserMenu from "./UserMenu";
import { toast } from 'react-toastify'
import { useQuery } from "@tanstack/react-query";
import { allCategories } from "../../apis";

const Header = ({ userMenu }: { userMenu: Object[]}) => {
  const router = useRouter();
  const [headerHandler, setHeaderHandler] = useState({
    openLogin: false,
    openMenu: false,
    mode: "login",
    openCart: false,
    openConfirm: false,
    openUserMenu: false,
  });
  const thisUser = useSelector(selectUser);
  const thisAdmin = useSelector(selectAdmin)
  const dispatch = useDispatch();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async() => await allCategories()
  })

  return (
    <>
      <div
        style={router.asPath === "/" ? {color: "white"} : {color: "black"}}
        className={`absolute ${thisAdmin ? 'top-8' : "top-0"} py-8 xxl:px-16 xl:px-14 lg:px-6 px-[160px]
        grid grid-cols-3 lg:grid-cols-2 sm:flex sm:justify-between sm:items-center
        items-start w-full text-white lg:text-black z-[1000]`}>
        <Link href={"/"}>
          <div className='flex justify-start gap-6 lg:gap-4'>
            {router.asPath === "/" ? (
              <Image
                src={"/assets/icons/logo.png"}
                width={45}
                height={35}
                alt='logo'
                className='lg:hidden'
              />
            ) : (
              <Image
                src={"/assets/icons/logo-black.png"}
                width={45}
                height={35}
                alt='logo'
                className='lg:hidden'
              />
            )}
            <Image
              src={"/assets/icons/logo-black.png"}
              width={45}
              height={35}
              alt='logo'
              className='hidden'
            />
            <p className='text-lg'>E-Shop</p>
          </div>
        </Link>
        <div className='lg:hidden flex justify-center items-center gap-20'>
          <Link href={"/"}
            onClick={() =>
              setHeaderHandler({
                ...headerHandler,
                openMenu: false
              })}>
            <p className='text-lg cursor-pointer'>Home</p>
          </Link>
          <Link href={"/shop"}
            onClick={() =>
              setHeaderHandler({
                ...headerHandler,
                openMenu: false
              })}>
            <p className='text-lg cursor-pointer'>Shop</p>
          </Link>
          <p
            className='text-lg cursor-pointer'
            onMouseEnter={() =>
              categories[0] &&
              setHeaderHandler({
                ...headerHandler,
                openMenu: true,
              })}
            onClick={() => categories[0] ? 
              setHeaderHandler({
                ...headerHandler,
                openMenu: !headerHandler.openMenu,
              })
              :
              toast.info("No products available yet.")}>
            Products
          </p>
        </div>
        <div className='flex justify-end gap-9 lg:gap-7 xs:gap-4'>
          <div
            className="relative cursor-pointer"
            onClick={() =>
              setHeaderHandler({
                ...headerHandler,
                openCart: !headerHandler.openCart,
              })}>
            <AiOutlineShoppingCart
            className='xs:text-lg text-2xl'
            />
            <div
              className="absolute bg-primary rounded-full h-[18px] w-[18px] text-xs flex items-center justify-center top-3 -right-[6px] font-semibold text-white">
              5
            </div>
          </div>
          {thisUser ? (
            <div className='relative flex gap-9 lg:gap-7'>
              <AiOutlineUser
                cursor={"pointer"}
                className='xs:text-lg text-2xl'
                onClick={() =>
                  setHeaderHandler({
                    ...headerHandler,
                    openUserMenu: !headerHandler.openUserMenu,
                  })
                }
              />
              <AiOutlineLogout
                cursor={"pointer"}
                className='lg:hidden xs:text-lg text-2xl'
                onClick={() =>
                  setHeaderHandler({
                    ...headerHandler,
                    openConfirm: !headerHandler.openConfirm,
                  })
                }
              />
              {headerHandler.openUserMenu && (
                <UserMenu
                  userMenu={userMenu}
                  closeHandler={() =>
                    setHeaderHandler({
                      ...headerHandler,
                      openUserMenu: !headerHandler.openUserMenu,
                    })
                  }
                  confirmHandler={() =>
                    setHeaderHandler({
                      ...headerHandler,
                      openConfirm: true,
                      openUserMenu: false,
                    })
                  }
                />
              )}
            </div>
          ) : (
            <AiOutlineLogin
              cursor={"pointer"}
              className='xs:text-lg text-2xl'
              onClick={() =>
                setHeaderHandler({
                  ...headerHandler,
                  openLogin: !headerHandler.openLogin,
                })
              }
            />
          )}
          <AiOutlineMenu
            cursor={"pointer"}
            className='hidden lg:block xs:text-lg text-2xl'
            onClick={() => categories[0] ? 
              setHeaderHandler({
                ...headerHandler,
                openMenu: !headerHandler.openMenu,
              })
              :
              toast.info("No products available yet.")}
          />
        </div>
      </div>
      <Login
        open={headerHandler.openLogin}
        closeHandler={() => {
          setHeaderHandler({
            ...headerHandler,
            mode: "login",
            openLogin: false,
          });
        }}
        mode={headerHandler.mode}
        loginHandler={() => setHeaderHandler({...headerHandler, mode: "login"})}
        signUpHandler={() =>
          setHeaderHandler({...headerHandler, mode: "signup"})
        }
        codeHandler={() => setHeaderHandler({...headerHandler, mode: "code"})}
      />

      {headerHandler.openMenu &&
          <Menu
            closeHandler={() =>
              setHeaderHandler({
                ...headerHandler,
                openMenu: false
              })}
            categories={categories}
          />
        }
      { headerHandler.openCart &&
        <CartModal
        closeHandler={() =>
          setHeaderHandler({
            ...headerHandler,
            openCart: false,
          })
        }
        />
      }
      {headerHandler.openConfirm && (
        <ConfirmModal
          mode='logout'
          closeHandler={() =>
            setHeaderHandler({
              ...headerHandler,
              openConfirm: !headerHandler.openConfirm,
            })
          }
          okHandler={() => {
            setHeaderHandler({
              ...headerHandler,
              openConfirm: !headerHandler.openConfirm,
            });
            dispatch(removeCurrentUser());
            toast.info("You're out")
          }}
        />
      )}
    </>
  );
};

export default Header;
