import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import StateProvider from "../layouts/StateProvider";
import {useState} from 'react'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "../global-state/store";
import {SessionProvider} from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import { AxiosError } from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  
  const [queryClient] = useState(() => new QueryClient())

  queryClient.setDefaultOptions({
    queries: {
      onError: (error: AxiosError | unknown) => {
        console.log(error)
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
          <Hydrate state={pageProps.dehydratedState}>
          <StateProvider>
              <Component {...pageProps} />
            <ToastContainer
            style={{zIndex:9999}}
            />
            </StateProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
