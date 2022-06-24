/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react';
import { Theme as ChakraTheme } from '@/style/theme';

declare module '@emotion/react' {
  export interface Theme extends ChakraTheme {}
}

declare module '@chakra-ui/utils' {
  export declare type Dict = ChakraTheme;
}
