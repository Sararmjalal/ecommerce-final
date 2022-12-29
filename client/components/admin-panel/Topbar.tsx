import React, { useState } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { removeCurrentAdmin, selectAdmin } from "../../global-state/slice"
import ConfirmModal from "../modals/Confirm"
import { useRouter } from "next/router"
import {toast} from 'react-toastify'

const AdminTopbar = () => {

  const thisAdmin = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const router = useRouter()
  const [openConfirm, setOpenConfirm] = useState(false)

  return thisAdmin && (
      <div className="w-full fixed top-0 py-2 bg-gray-800 flex justify-between px-4 text-gray-100 text-sm  z-[9998]">
        <div>
          <Link href="/admin/dashboard">
              Hello <span className="font-semibold text-white">{thisAdmin.name}</span>
          </Link>
      </div>
      <div className="flex gap-2">
        <div>
          
          <Link href={router.asPath.includes('admin/dashboard') ? "/" : "/admin/dashboard"}>
            <p className="w-max mr-3 text-gray-300 hover:text-white">
              {
                router.asPath.includes('admin/dashboard') ?
                  "View Site"
                  :
                  "Dashboard"
              }
            </p>
          </Link>     
        </div>
          <div
          className="w-max text-gray-300 hover:text-white cursor-pointer"
          onClick={() => setOpenConfirm(true)}>
            Logout
          </div>
      </div>
      {
        openConfirm &&
        <ConfirmModal
          mode="logout"
          closeHandler={() => setOpenConfirm(false)}
          okHandler={() => {
            toast.info("You're out")
            dispatch(removeCurrentAdmin())
          }}
        />
      }
      </div>
  )
}

export default AdminTopbar