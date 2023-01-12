import { useSelector } from "react-redux"
import { selectAdmin } from "../../../global-state/slice"

const AdminDashboard = () => {
  const thisAdmin = useSelector(selectAdmin)
  return (
    <div className="font-light">
      <p className="leading-8">Hello <span className="font-normal">{thisAdmin?.name}</span>! This is your dashboard.</p>
      <p className="leading-8">You can create new categories here, add products and manage the older ones.</p>
    </div>
  )
}

export default AdminDashboard