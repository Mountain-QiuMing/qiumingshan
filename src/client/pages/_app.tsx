import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider, EmotionCache, Global, ThemeProvider } from '@emotion/react';
import globalStyle from '@/style/global';
import { theme } from '@/style/theme';
import createEmotionCache from '@/utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
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
  );
}
