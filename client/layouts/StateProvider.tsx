import React from "react";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import NewsLetter from "../components/main/NewsLetter";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import {useRouter} from "next/router";

const StateProvider = ({children} : { children: JSX.Element|JSX.Element[] }) => {
  const router = useRouter();

  if (router.asPath === '/admin/login')
    return <main>{children}</main>
  if (router.asPath.includes("admin"))
    return (
      <AdminPanel>
        {children}
      </AdminPanel>
    );
  if (router.asPath.includes('user'))
    return (
      <UserPanel>
        {children}
      </UserPanel>
    )
  return (
    <>
      <Header />
      <div className={`${router.asPath !== '/' && 'page'}`}>{children}</div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default StateProvider;
