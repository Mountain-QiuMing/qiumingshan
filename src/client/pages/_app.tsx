import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import globalStyle from '../style/global';
import { theme } from '../style/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </>
    </ChakraProvider>
  );
}
