import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import globalStyle from '../style/global';
import { colorModeConfig } from '../utils/color-mode';

const theme = extendTheme({
  config: colorModeConfig,
  colors: {
    main: {
      500: 'red.500',
    },
    brand: {
      50: '#cbbff8',
      100: '#876cea',
      200: '#582CFF',
      300: '#542de1',
      400: '#4a25d0',
      500: '#3915bc',
      600: '#300eaa',
      700: '#1c0377',
      800: '#130156',
      900: '#0e0042',
    },
    primary: '#13c2c2',
  },
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
