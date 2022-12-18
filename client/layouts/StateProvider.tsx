import React from "react";
import Footer from "../components/general/Footer";
import Header from "../components/general/Header";
import NewsLetter from "../components/general/NewsLetter";
import Panel from "./Panel";
import AdminLogin from "./AdminLogin";
import {useRouter} from "next/router";

const StateProvider = ({children}: any) => {
  const router = useRouter();

  if (router.asPath.includes("admin-login"))
    return (
      <AdminLogin>
        <main>{children}</main>
      </AdminLogin>
    );

  if (router.asPath.includes("panel"))
    return (
      <Panel>
        <main>{children}</main>
      </Panel>
    );
  return (
    <>
      <Header />
      <main>{children}</main>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default StateProvider;
