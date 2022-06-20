import { FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { Box, Heading, Show } from '@chakra-ui/react';
import Link from 'next/link';

const menuList = [
  { name: '首页', path: '/' },
  { name: '问答', path: '/faq' },
  { name: '发现', path: '/explore' },
];

const Header: FC = () => {
  return (
    <Box height={[16, 20]} px={[4, 20]} css={headerStyle}>
      <Box display="flex" alignItems="center">
        <Show above="sm">
          <Image className="logo-img" src="/logo.png" width="40px" height="40px" />
        </Show>

        <Heading ml={1} fontSize="2xl">
          秋名山
        </Heading>
      </Box>
      <Box as="ul" pl={[4, 10]} className="menus">
        {menuList.map(menu => (
          <Box as="li" mr={[4, 10]} fontSize={['md', 'large']} key={menu.path}>
            <Link href={menu.path}>{menu.name}</Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Header;

const headerStyle = css`
  display: flex;
  .menus {
    display: flex;
    align-items: center;
    list-style: none;
  }
`;
