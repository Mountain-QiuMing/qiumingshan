import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Global } from '@emotion/react';
import globalStyle from '../style/global';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#13C2C2',
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primary: '#13C2C2',
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}
