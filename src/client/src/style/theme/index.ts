import { extendTheme, withDefaultProps } from '@chakra-ui/react';
import { colorModeConfig } from './config';
import { color } from './color';
import { component } from './component';

export const theme = extendTheme(
  {
    config: colorModeConfig,
    colors: color,
    components: component,
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: 'primary',
      size: 'sm',
    },
  }),
);
