import React from "react";
import {createPortal} from "react-dom";
import Login from "../general/Login";
import Signup from "../general/Signup";

const SignIn = ({
  open,
  closeHandler,
  mode,
  loginHandler,
  signUpHandler,
}: any) => {
  if (!open) return null;

  return createPortal(
    mode === "login" ? (
      <Login closeHandler={closeHandler} signUpHandler={signUpHandler} />
    ) : (
      <Signup closeHandler={closeHandler} loginHandler={loginHandler} />
    ),
    document.querySelector("#signin-portal") as HTMLElement
  );
};

export default SignIn;
