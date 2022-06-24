import { css } from '@emotion/react';
import { Box, ChakraComponent, useColorMode } from '@chakra-ui/react';
import { SunLineIcon, MoonLineIcon } from 'ultra-icon';
import { omit } from 'lodash-es';
import { ThemeEnum } from 'shared/constants/theme.enum';

interface ThemeSwitchProps {
  onChange?: (nextTheme: ThemeEnum) => void;
}

const ThemeSwitch: ChakraComponent<'span', ThemeSwitchProps> = props => {
  const { onChange } = props;
  const { toggleColorMode, colorMode } = useColorMode();

  const handleSwitchTheme = async () => {
    const nextTheme = colorMode === ThemeEnum.DARK ? ThemeEnum.light : ThemeEnum.DARK;
    toggleColorMode();
    onChange?.(nextTheme);
  };

  return (
    <Box as="span" onClick={handleSwitchTheme} css={themeSwitchStyle} {...omit(props, 'as')}>
      {colorMode === 'dark' ? <SunLineIcon size={24} /> : <MoonLineIcon size={24} />}
    </Box>
  );
};

export default ThemeSwitch;

const themeSwitchStyle = css`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;