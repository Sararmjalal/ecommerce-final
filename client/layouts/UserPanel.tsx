import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AdminTopbar from "../components/admin-panel/Topbar"
import DashboardMenu from "../components/main/DashboardMenu"
import DashboardThisName from "../components/main/DashboardThisName"
import Header from "../components/main/Header"
import Loading from "../components/main/Loading"
import { removeCurrentCart, removeCurrentUser, selectAdmin, selectUser } from "../global-state/slice"
import { LayoutProps } from "../lib/interfaces"

const UserPanel = ({ children, userMenu }: LayoutProps) => {
  
  const thisUser = useSelector(selectUser)
  const thisAdmin = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const router = useRouter()
  const thisName = () => userMenu.find(({ name, path }) => path === router.asPath)

  useEffect(() => {
    !thisUser && router.push('/')
  } , [thisUser])

  if(!thisUser) return <Loading />
  return ( 
    <div>
      <AdminTopbar />
      <Header userMenu={userMenu} />
      <div
        className='border-t-[1px] border-grayborder'
        style={thisAdmin ? {marginTop: "130px"} : {marginTop: "100px"}}>
        <div className='relative min-h-[calc(100vh-210px)] mx-9 my-10 md:mx-4'>
          <DashboardMenu
            menu={userMenu}
            logoutFunc={() => {
              dispatch(removeCurrentUser());
              dispatch(removeCurrentCart())
            }}
          />
          <div className='ml-[330px] md:ml-0'>
          { thisName() && <DashboardThisName name={thisName()!["name"]} /> }
            {children}
          </div>
        </div>
      </div>
    </div>
  );

}

export default UserPanel