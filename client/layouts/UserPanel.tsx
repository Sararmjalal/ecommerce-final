import { useRouter } from "next/router"
import React, { useState, useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Header from "../components/main/Header"
import Loading from "../components/main/Loading"
import { selectUser } from "../global-state/slice"

const UserPanel = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  
  const thisUser = useSelector(selectUser)

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    thisUser ? setLoading(false) : router.push('/')
  } , [])

  if(!thisUser) return <Loading />
  return  <div className="page">{children}</div>

}

export default UserPanel