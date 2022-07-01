import { HTMLChakraProps, chakra, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface HeaderNavLinkProps extends Omit<HTMLChakraProps<'a'>, 'href'> {
  href: string;
}

function HeaderNavLink(props: HeaderNavLinkProps) {
  const { href, ...rest } = props;
  const { pathname } = useRouter();

  const [, group] = href.split('/');
  const isActive = pathname.includes(group);

  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? 'page' : undefined}
        display="block"
        py="1"
        px={[1, 1.5, 2, 2.5, 3]}
        borderRadius="full"
        transition="all 0.3s"
        color={useColorModeValue('gray.600', 'whiteAlpha.800')}
        fontWeight="normal"
        _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.100') }}
        fontSize={['small', 'medium', 'large']}
        _activeLink={{
          fontWeight: 'semibold',
          color: 'primary.500',
        }}
        {...rest}
      />
    </NextLink>
  );
}

export default HeaderNavLink;
