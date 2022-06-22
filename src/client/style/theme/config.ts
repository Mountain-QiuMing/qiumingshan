import { setCookies, getCookie } from 'cookies-next';
import { STORAGE_KEY, type ThemeConfig } from '@chakra-ui/react';

export const colorModeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  cssVarPrefix: 'ck',
} as const;

export const ensureColorMode = ctx => {
  let cookie = getCookie(STORAGE_KEY, ctx);
  if (!cookie) {
    cookie = colorModeConfig.initialColorMode;
    setCookies(STORAGE_KEY, cookie, ctx);
  }
  return ctx.req.headers.cookie;
};
