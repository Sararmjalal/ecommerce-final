import React from "react"
import Header from "../components/main/Header"

const UserPanel = ({ children } : {children: JSX.Element|JSX.Element[]}) => {

  return  <div className="page">{children}</div>

}

export default UserPanel