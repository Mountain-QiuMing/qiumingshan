import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider, EmotionCache, Global, ThemeProvider } from '@emotion/react';
import globalStyle from '@/style/global';
import { theme } from '@/style/theme';
import createEmotionCache from '@/utils/create-emotion-cache';
import { getDefaultInitialState, StoreProvider, useCreateStore } from '../src/store';
import { NextPage, NextPageContext } from 'next';
import App from 'next/app';
import { setCookies } from 'cookies-next';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  cookies: { [x: string]: any };
}

const MyApp: NextPage<MyAppProps> = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, cookies } = props;
  const createStore = useCreateStore(pageProps.initialZustandState || getDefaultInitialState(cookies));

  return (
    <StoreProvider createStore={createStore}>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <>
              <Global styles={globalStyle} />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </ChakraProvider>
      </CacheProvider>
    </StoreProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (context: any) => {
  const pageProps: any = await App.getInitialProps(context);
  const { req, res } = context.ctx as NextPageContext;
  const cookies = context.ctx.req?.cookies || {};

  for (const key in cookies) {
    setCookies(key, cookies[key], { req, res });
  }

  return {
    ...pageProps,
    cookies,
  };
};
