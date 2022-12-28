import React from "react"
import { useState } from "react"
import Link from "next/link"

const DashboardSidebar = () => {
  const [showModal, setShowModal] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showAddPro, setShowAddPro] = useState(false)
  const [showAddCat, setShowAddCat] = useState(false)

  return (
    <div>
      This is sidebar
    </div>
  )
}

export default DashboardSidebar