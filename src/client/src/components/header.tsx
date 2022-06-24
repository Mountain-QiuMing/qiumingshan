import { FC } from 'react';
import NextImage from 'next/image';
import { css } from '@emotion/react';
import { Box, Heading, Menu, MenuButton, MenuItem, MenuList, Show, Image, Hide, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookie, getCookies, removeCookies } from 'cookies-next';
import ThemeSwitch from './theme-switch';
import { apiUpdateUserInfo } from '../api/user/user-info';
import { ThemeEnum } from 'shared/constants/theme.enum';
import { useStore } from '../store';
import HeaderNavLink from './header-nav-link';

const menuList = [
  { name: '首页', path: '/' },
  { name: '问答', path: '/faq' },
  { name: '发现', path: '/explore' },
];

const Header: FC = () => {
  const router = useRouter();
  const store = useStore();

  const showUserInfo = () => {
    const username = getCookie('username');
    router.push(`/user/${username}`);
  };

  const handleLogout = () => {
    const cookies = getCookies();
    for (const key in cookies) {
      removeCookies(key);
    }
    store.clearUserInfo();
  };

  const handleThemeChange = (nextTheme: ThemeEnum) => {
    store.setUserInfo({
      theme: nextTheme,
    });
    store.token &&
      apiUpdateUserInfo({
        theme: nextTheme,
      });
  };

  return (
    <Box height={[16, 20]} px={[4, 5, 20]} css={headerStyle}>
      <Link href="/">
        <div className="logo">
          <Hide below="sm">
            <NextImage className="logo-img" src="/logo.png" width="40px" height="40px" />
          </Hide>

          <Heading ml={2} fontSize="2xl">
            秋名山
          </Heading>
        </div>
      </Link>
      <Box as="ul" pl={[4, 5, 10]} className="menus">
        {menuList.map(menu => (
          <Box as="li" mr={[4, 10]} fontSize={['md', 'large']} key={menu.path}>
            <HeaderNavLink href={menu.path}>{menu.name}</HeaderNavLink>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" userSelect="none">
        <Show above="sm">
          <Link href="/write-post">
            <Button mr={10} colorScheme="primary">
              发文
            </Button>
          </Link>
          <ThemeSwitch mr={4} onChange={handleThemeChange} />
        </Show>
        {store.token ? (
          <Menu>
            <MenuButton>
              <Image
                boxSize="2rem"
                borderRadius="full"
                src="https://placekitten.com/100/100"
                alt="Fluffybuns the destroyer"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={showUserInfo}>个人信息</MenuItem>
              <MenuItem onClick={handleLogout}>退出登录</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href="/login">登录/注册</Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;

const headerStyle = css`
  display: flex;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .menus {
    flex: 1;
    display: flex;
    align-items: center;
    list-style: none;
  }
`;
