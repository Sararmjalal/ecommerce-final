import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StateProvider from "../layouts/StateProvider";
import {Provider} from "react-redux";
import {store} from "../state/Store";
import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";

export default function App({Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <StateProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </StateProvider>
      </Provider>
    </SessionProvider>
  );
}
