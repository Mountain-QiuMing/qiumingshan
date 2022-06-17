import { css } from '@emotion/react';
import { useColorMode } from '@chakra-ui/react';
import { SunLineIcon, MoonLineIcon } from 'ultra-icon';

export default () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <span onClick={toggleColorMode} css={thmeSwitchStyle}>
      {colorMode === 'dark' ? <SunLineIcon size={24} /> : <MoonLineIcon size={24} />}
    </span>
  );
};

const thmeSwitchStyle = css`
  cursor: pointer;
`;
