import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      border: '1px solid',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};
