import { useColorMode, IconButton, ChakraComponent } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { apiUpdateUserInfo } from '../api/user/user-info';
import { useStore } from '../store';
import { ThemeEnum } from 'shared/constants/theme.enum';
import { css } from '@emotion/react';
import { omit } from 'lodash-es';

const ThemeSwitch: ChakraComponent<'span'> = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const store = useStore();

  const onChange = () => {
    toggleColorMode();
    const nextTheme = isDark ? ThemeEnum.light : ThemeEnum.DARK;
    store.setUserInfo({
      theme: nextTheme,
    });
    store.token &&
      apiUpdateUserInfo({
        theme: nextTheme,
      });
  };

  return (
    <IconButton
      css={themeSwitchStyle}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label="切换主题"
      onClick={onChange}
      bg="transparent"
      {...omit(props, 'as')}
    />
  );
};

export default ThemeSwitch;

const themeSwitchStyle = css`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;
