import React from "react"
import Header from "../components/main/Header"

const UserPanel = ({ children } : {children: JSX.Element|JSX.Element[]}) => {

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default UserPanel