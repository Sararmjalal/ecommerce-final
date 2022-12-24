import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineLogin,
} from "react-icons/ai";
import Login from "../modals/SignIn";
import {useSession, signOut} from "next-auth/react";
import Menu from "./Menu";
import CartModal from "../cart/CartModal";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState("login");
  const [searchMode, setSearchMode] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const router = useRouter();
  const {data: session} = useSession();
  console.log(router.asPath);
  return (
    <>
      <div
        style={router.asPath === "/" ? {color: "white"} : {color: "black"}}
        className='absolute top-0 pt-8 xxl:px-16 xl:px-14 lg:px-6 px-[160px]
        grid grid-cols-3 lg:grid-cols-2 items-start w-full text-white lg:text-black z-[1000]'>
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
          <Link href={"/"}>
            <p className='text-lg cursor-pointer'>Home</p>
          </Link>
          <Link href={"/shop"}>
            <p className='text-lg cursor-pointer'>Shop</p>
          </Link>
          <p onClick={() => setMenu(!menu)} className='text-lg cursor-pointer'>
            Products
          </p>
        </div>

        <div className='flex justify-end gap-9 lg:gap-7'>
          <AiOutlineSearch
            onClick={() => setSearchMode(!searchMode)}
            size={22}
            cursor={"pointer"}
          />
          <AiOutlineShoppingCart
            size={22}
            cursor={"pointer"}
            onClick={() => setOpenCart(!openCart)}
          />
          <AiOutlineUser size={22} cursor={"pointer"} className='lg:hidden' />
          {session ? (
            <div className='flex flex-col items-center'>
              <p>Welcome ,{session.user?.email}</p>
              <img
                src={session.user?.image!}
                alt='gmail-pic'
                className='rounded-full w-5 h-5'
              />
            </div>
          ) : (
            <AiOutlineLogin
              size={22}
              cursor={"pointer"}
              className='lg:hidden'
              onClick={() => setOpenLogin(true)}
            />
          )}

          <AiOutlineMenu
            size={22}
            cursor={"pointer"}
            className='hidden lg:block'
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>
      <Login
        open={openLogin}
        closeHandler={() => {
          setMode("login");
          setOpenLogin(false);
        }}
        mode={mode}
        loginHandler={() => setMode("login")}
        signUpHandler={() => setMode("signup")}
      />

      {menu && (
        <>
          <div
            onClick={() => setMenu(!menu)}
            className='modal-backdrop sticky top-32'></div>
          <Menu />
        </>
      )}

      {searchMode && (
        <input
          type={"text"}
          className='outline-none rounded-md px-2 text-black'
          placeholder='search ...'
        />
      )}

      {openCart && <CartModal />}
    </>
  );
};

export default Header;
