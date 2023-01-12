import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import Loading from "../components/main/Loading";
import MainLayout from "./MainLayout";
import { useRouter } from "next/router";
import { useToken } from "../lib";
import { useMutation } from "@tanstack/react-query";
import { adminInfo, userInfo, myCart } from "../apis";
import { useDispatch } from "react-redux";
import { setCurrentAdmin, setCurrentUser, setCurrentCart } from "../global-state/slice";

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
    onSuccess: async(res) => {
      dispatch(setCurrentUser(res.data))
      const thisCart = await myCart()
      dispatch(setCurrentCart(thisCart.data))
    },
    onSettled: () => setLoading(false),
    onError: () => setLoading(false)
  })

  useEffect(() => {
    if (useToken('admin')) setAdminInfo.mutate()
    else if (useToken('user')) setUserInfo.mutate()
    else setLoading(false)
  }, [])

  if (loading) return <Loading />
  
  if (router.asPath === "/admin/login" || router.asPath === "/admin/create")
    return <div>{children}</div>;
  
  if (router.asPath.includes("/admin/dashboard"))
    return <AdminPanel>{children}</AdminPanel>;
  
  if (router.asPath.includes("dashboard"))
    return <UserPanel userMenu={userMenu}>{children}</UserPanel>
    
    return <MainLayout userMenu={userMenu}>{children}</MainLayout>
};

export default StateProvider;
