import '@/styles/globals.css'
import { RecoilRoot } from "recoil";
import type { AppProps } from 'next/app'
import AppBar from '../components/AppBar';
import InitUser from '@/components/InitUser';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppBar />
      <InitUser />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
