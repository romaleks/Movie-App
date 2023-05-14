import { Outfit } from '@next/font/google'
import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import '@/assets/styles/globals.scss'

type TypeAppProps = AppProps & TypeComponentAuthFields

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export default function App({ Component, pageProps }: TypeAppProps) {
  return (
    <div className={outfit.className}>
      <MainProvider Component={Component}>
        <Component {...pageProps} />
      </MainProvider>
    </div>
  )
}
