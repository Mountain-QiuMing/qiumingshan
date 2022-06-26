import { mode } from '@chakra-ui/theme-tools';

export const style = {
  global: props => ({
    ':root': {
      '--user-text-reverseColor': mode('var(--ck-colors-whiteAlpha-900)', 'var(--ck-colors-gray-800)')(props),
      '--user-bg-color': mode('var(--ck-colors-white)', 'var(--ck-colors-black)')(props),
      '--user-bg-color-alpha-50': mode('var(--ck-colors-whiteAlpha-50)', 'var(--ck-colors-blackAlpha-400)')(props),
      '--user-bg-color-alpha-100': mode('var(--ck-colors-whiteAlpha-100)', 'var(--ck-colors-blackAlpha-100)')(props),
      '--user-bg-color-alpha-200': mode('var(--ck-colors-whiteAlpha-200)', 'var(--ck-colors-blackAlpha-200)')(props),
      '--user-bg-color-alpha-300': mode('var(--ck-colors-whiteAlpha-300)', 'var(--ck-colors-blackAlpha-300)')(props),
      '--user-bg-color-alpha-400': mode('var(--ck-colors-whiteAlpha-400)', 'var(--ck-colors-blackAlpha-400)')(props),
      '--user-bg-color-alpha-500': mode('var(--ck-colors-whiteAlpha-500)', 'var(--ck-colors-blackAlpha-500)')(props),
      '--user-bg-color-alpha-600': mode('var(--ck-colors-whiteAlpha-600)', 'var(--ck-colors-blackAlpha-600)')(props),
      '--user-bg-color-alpha-700': mode('var(--ck-colors-whiteAlpha-700)', 'var(--ck-colors-blackAlpha-700)')(props),
      '--user-bg-color-alpha-800': mode('var(--ck-colors-whiteAlpha-800)', 'var(--ck-colors-blackAlpha-800)')(props),
      '--user-bg-color-alpha-900': mode('var(--ck-colors-whiteAlpha-900)', 'var(--ck-colors-blackAlpha-900)')(props),
      '--user-bg-reverseColor': mode('var(--ck-colors-white)', 'var(--ck-colors-black)')(props),
      '--user-bg-reverseColor-alpha-501': mode(
        'var(--ck-colors-blackAlpha-501)',
        'var(--ck-colors-whiteAlpha-400)',
      )(props),
      '--user-bg-reverseColor-alpha-100': mode(
        'var(--ck-colors-blackAlpha-100)',
        'var(--ck-colors-whiteAlpha-100)',
      )(props),
      '--user-bg-reverseColor-alpha-200': mode(
        'var(--ck-colors-blackAlpha-200)',
        'var(--ck-colors-whiteAlpha-200)',
      )(props),
      '--user-bg-reverseColor-alpha-300': mode(
        'var(--ck-colors-blackAlpha-300)',
        'var(--ck-colors-whiteAlpha-300)',
      )(props),
      '--user-bg-reverseColor-alpha-400': mode(
        'var(--ck-colors-blackAlpha-400)',
        'var(--ck-colors-whiteAlpha-400)',
      )(props),
      '--user-bg-reverseColor-alpha-500': mode(
        'var(--ck-colors-blackAlpha-500)',
        'var(--ck-colors-whiteAlpha-500)',
      )(props),
      '--user-bg-reverseColor-alpha-600': mode(
        'var(--ck-colors-blackAlpha-600)',
        'var(--ck-colors-whiteAlpha-600)',
      )(props),
      '--user-bg-reverseColor-alpha-700': mode(
        'var(--ck-colors-blackAlpha-700)',
        'var(--ck-colors-whiteAlpha-700)',
      )(props),
      '--user-bg-reverseColor-alpha-800': mode(
        'var(--ck-colors-blackAlpha-800)',
        'var(--ck-colors-whiteAlpha-800)',
      )(props),
      '--user-bg-reverseColor-alpha-900': mode(
        'var(--ck-colors-blackAlpha-900)',
        'var(--ck-colors-whiteAlpha-900)',
      )(props),
    },
  }),
};
