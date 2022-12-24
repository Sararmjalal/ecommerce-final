import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StateProvider from "../layouts/StateProvider";
import {Provider} from "react-redux";
import {store} from "../global-state/store";
import {SessionProvider} from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  
  const queryClient = new QueryClient()

  queryClient.setDefaultOptions({
    queries: {
      onError: (error: AxiosError | unknown) => {
        error instanceof AxiosError ? toast.error(error?.response?.data?.msg) : toast.error('Something went wrong.')
      }
    },
      mutations: {
      onError: (error: AxiosError | unknown) => {
          error instanceof AxiosError ? toast.error(error?.response?.data?.msg) : toast.error('Something went wrong.')
        }
      }
  })

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <StateProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </StateProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
