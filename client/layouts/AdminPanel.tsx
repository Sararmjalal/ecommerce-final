import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/admin-panel/Sidebar";
import AdminTopbar from "../components/admin-panel/Topbar";
import { selectAdmin } from "../global-state/slice";
import {toast} from 'react-toastify'
import { useRouter } from "next/router";
import Loading from "../components/main/Loading";

const AdminPanel = ({ children }: {children: JSX.Element | JSX.Element[]}) => {
  
  const thisAdmin = useSelector(selectAdmin)

  const router = useRouter()

  useEffect(() => {
    thisAdmin ? toast.success("You're in") : router.push('/admin/login')
  }, [])

  if(!thisAdmin) return <Loading />
  return (
    <div>
      <AdminTopbar />
      <Sidebar />
        <main className='m-5'>{children}</main>
    </div>
  );
};

export default AdminPanel;
