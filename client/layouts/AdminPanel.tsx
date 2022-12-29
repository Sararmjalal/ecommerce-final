import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTopbar from "../components/admin-panel/Topbar";
import { removeCurrentAdmin, selectAdmin } from "../global-state/slice";
import {toast} from 'react-toastify'
import { useRouter } from "next/router";
import Loading from "../components/main/Loading";
import DashboardMenu from "../components/main/DashboardMenu";
import DashboardThisName from "../components/main/DashboardThisName";

const AdminPanel = ({ children }: {children: JSX.Element | JSX.Element[]}) => {
  
  const thisAdmin = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const router = useRouter()
  const adminMenu = [{
      name: 'Dashboard',
      path: '/admin/dashboard'
    },
    {
      name: 'All Categories',
      path: '/admin/dashboard/categories'
    },
    {
      name: 'Add Category',
      path: '/admin/dashboard/add-new-category'
    },
    {
      name: 'All Products',
      path: '/admin/dashboard/products'
    },
    {
      name: 'Add Product',
      path: '/admin/dashboard/add-new-product'
    }, {
      name: 'All Users',
      path: '/admin/dashboard/users'
  }]
  const thisName = () => adminMenu.find(({ name, path }) => path === router.asPath)
  
  useEffect(() => {
    !thisAdmin && router.push('/admin/login')
  }, [thisAdmin])

  if(!thisAdmin) return <Loading />
  return (
    <div>
      <AdminTopbar />
      <div className='admin-dashboard-layout'>
        <DashboardMenu
          menu={adminMenu}
          logoutFunc={() => {
            dispatch(removeCurrentAdmin());
          }}
        />
        <div className='admin-dashboard-page'>
          <DashboardThisName name={thisName()!["name"]} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
