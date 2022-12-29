import AdminTopbar from "../components/admin-panel/Topbar"
import Header from "../components/main/Header"
import Footer from "../components/main/Footer"
import { LayoutProps } from "../lib/interfaces"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectAdmin } from "../global-state/slice"

const MainLayout = ({ children, userMenu }: LayoutProps) => {

  const router = useRouter()
  const thisAdmin = useSelector(selectAdmin)

  return (
    <div>
    <AdminTopbar />
      <Header userMenu={userMenu} />
      <div
        className={`${router.asPath !== "/" && 'page'}`}
        style={thisAdmin &&  router.asPath !== "/" ? {marginTop:  "130px"} : {}}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout