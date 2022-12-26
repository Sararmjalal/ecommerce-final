import React from "react";
import Sidebar from "../components/admin-panel/Sidebar";

const AdminPanel = ({children}: any) => {
  return (
    <>
      <div className='flex flex-auto'>
        <Sidebar />
        <div className='grow'>
          <main className='m-5'>{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
