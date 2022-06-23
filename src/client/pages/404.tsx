import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HomeFillIcon } from 'ultra-icon';
import Layout from '../components/layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <VStack justify="center" spacing="4" as="section" mt={['20', null, '40']} textAlign="center">
        <Heading>404</Heading>
        <Text fontSize={{ md: 'xl' }}>您要找的页面不存在</Text>
        <NextLink href="/" passHref>
          <Button as="a" aria-label="Back to Home" leftIcon={<HomeFillIcon />} colorScheme="teal" size="lg">
            返回首页
          </Button>
        </NextLink>
      </VStack>
    </Layout>
  );
};

export default NotFoundPage;
