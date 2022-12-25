import React from "react";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import {useRouter} from "next/router";

const StateProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const router = useRouter();

  const userMenu = [
    {
      name: "Dashboard",
      path: "/dashboard"
    },
    {
      name: "My Orders",
      path: "/dashboard/my-orders"
    },
    {
      name: "My Addresses",
      path: "/dashboard/my-addresses"
    }
  ]

  if (router.asPath === "/admin/login" || router.asPath === "/admin/create")
    return <main>{children}</main>;
  
  if (router.asPath.includes("admin"))
    return <AdminPanel>{children}</AdminPanel>;
  
  if (router.asPath.includes("user"))
    return (
      <>
        <Header
        userMenu={userMenu}
        />
      <UserPanel>
       {children}
      </UserPanel>
      </>
    )
  
  return (
    <>
      <Header
        userMenu={userMenu}
      />
      <div
        className={`${router.asPath !== "/" && "page"}`}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default StateProvider;
