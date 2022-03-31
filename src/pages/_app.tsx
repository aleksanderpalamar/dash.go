import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { SidebarDrawerProvider } from '../components/contexts/SidebarDrawerContent'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
