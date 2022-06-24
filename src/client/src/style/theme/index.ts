import { extendTheme, withDefaultProps } from '@chakra-ui/react';
import { colorModeConfig } from './config';
import { color } from './color';
import { component } from './component';
import type { Theme as ChakraTheme } from '@chakra-ui/theme';

export const theme = extendTheme(
  {
    config: colorModeConfig,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    colors: color,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components: component,
  },
  withDefaultProps({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultProps: {
      // colorScheme: 'primary',
      size: 'sm',
    },
  }),
);

export type Theme = ChakraTheme;
