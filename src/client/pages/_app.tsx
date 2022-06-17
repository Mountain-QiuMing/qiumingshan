import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import globalStyle from '../style/global';
import { colorModeConfig } from '../utils/color-mode';

const theme = extendTheme({
  config: colorModeConfig,
});

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
