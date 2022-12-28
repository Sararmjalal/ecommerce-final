import React, { useEffect, useState } from "react";
import Footer from "../components/main/Footer";
import Header from "../components/main/Header";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import { useRouter } from "next/router";
import { useToken } from "../lib";
import { useMutation } from "@tanstack/react-query";
import { adminInfo, userInfo } from "../apis";
import { useDispatch } from "react-redux";
import { setCurrentAdmin, setCurrentUser } from "../global-state/slice";

const StateProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  
  const router = useRouter();

  const dispatch = useDispatch()

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

  const [loading, setLoading] = useState(true)

  const setAdminInfo = useMutation({
    mutationFn: async () => await adminInfo(),
    onSuccess: (res) => {
      dispatch(setCurrentAdmin(res.data))
    },
    onSettled: () => {
      if (useToken('user')) setUserInfo.mutate()
      else setLoading(false)
    },
    onError: () => {
      if (useToken('user')) setUserInfo.mutate()
      else setLoading(false)
    },
  });

  const setUserInfo = useMutation({
    mutationFn: async () => await userInfo(),
    onSuccess: (res) => {
      dispatch(setCurrentUser(res.data))
    },
    onSettled: () => setLoading(false),
    onError: () => setLoading(false)
  })

  useEffect(() => {
    setAdminInfo.mutate()
  }, [])

  if (loading) return <h1>Loading...</h1>
  
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
