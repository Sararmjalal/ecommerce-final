import React from "react";
import Sidebar from "../components/panel/Sidebar";

const Panel = ({children}: any) => {
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

export default Panel;
