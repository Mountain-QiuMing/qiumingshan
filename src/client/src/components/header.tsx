import { FC, ReactNode } from 'react';
import NextImage from 'next/image';
import { css } from '@emotion/react';
import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Image,
  Hide,
  Button,
  Text,
  ChakraProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookie, getCookies, removeCookies } from 'cookies-next';
import ThemeSwitch from './theme-switch';
import { useStore } from '../store';
import HeaderNavLink from './header-nav-link';

const menuList = [
  { name: '首页', path: '/' },
  { name: '问答', path: '/faq' },
  { name: '发现', path: '/explore' },
];

interface HeaderProps extends ChakraProps {
  children?: ReactNode;
  between?: boolean;
}

const Header: FC<HeaderProps> = props => {
  const { children, ...rest } = props;
  const router = useRouter();
  const store = useStore();

  const showUserInfo = () => {
    const username = getCookie('username');
    router.push(`/${username}`);
  };

  const handleLogout = () => {
    const cookies = getCookies();
    for (const key in cookies) {
      removeCookies(key);
    }
    store.clearUserInfo();
  };

  return (
    <Box height={[16, 20]} px={[4, 5, 20]} css={headerStyle} bg="black.800">
      <Link href="/">
        <div className="logo">
          <Hide below="sm">
            <NextImage className="logo-img" src="/logo.png" width="40px" height="40px" />
          </Hide>

          <Heading ml={2} fontSize={['large', 'larger', '2xl']}>
            秋名山
          </Heading>
        </div>
      </Link>
      <Box display="flex" flex="1" alignItems="center" px={[2, 4, 6]} {...rest}>
        {children || (
          <>
            <Box as="ul" pl={[4, 5, 10]} className="menus">
              {menuList.map(menu => (
                <Box as="li" mr={[2, 4, 6, 8, 10]} fontSize={['md', 'large']} key={menu.path}>
                  <HeaderNavLink href={menu.path}>{menu.name}</HeaderNavLink>
                </Box>
              ))}
            </Box>
            <Show above="sm">
              <Link href="/write-post">
                <Button mr={10} colorScheme="primary">
                  发文
                </Button>
              </Link>
            </Show>
          </>
        )}
      </Box>

      <Box display="flex" alignItems="center" userSelect="none">
        <ThemeSwitch mr={4} />
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
          <Link href="/login">
            <Text fontSize={[13, 15]}>登录/注册</Text>
          </Link>
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
