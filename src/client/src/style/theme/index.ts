import { extendTheme, withDefaultProps } from '@chakra-ui/react';
import { colorModeConfig } from './config';
import { color } from './color';
import { component } from './component';
import type { Theme as ChakraTheme } from '@chakra-ui/theme';
import { style } from './style';
import { semanticTokens } from './semantic-token';

export const theme = extendTheme(
  {
    config: colorModeConfig,
    colors: color,
    components: component,
    styles: style,
    semanticToken: semanticTokens,
  },
  withDefaultProps({
    defaultProps: {
      // colorScheme: 'primary',
      size: 'sm',
    },
  }),
);

export type Theme = ChakraTheme;
