import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/layout';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { apiGetUserInfoByName } from '../src/api/user/user-info';
import { useRouter } from 'next/router';

interface IndexPageProps {
  user: BaseUserInfo;
}

const IndexPage: NextPage<IndexPageProps> = props => {
  // const route = useRouter();
  // console.log(route);
  const { user } = props;
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Flex flexDir="column" px={10} py={4} bg="black.800" borderRadius="sm">
        <Flex alignItems="center" my={4}>
          <Avatar src={user.avatar} width={10} height={10} mr={2} />
          <Box>
            <Text fontSize="larger" as="span">
              {user.username || user.nickname}
            </Text>
            <Text ml={2} fontSize="large" as="span" fontWeight="bold">
              @{user.username}
            </Text>
          </Box>
        </Flex>
        <Text>注册时间：{user.createTime}</Text>
        {user.description && <Text ml={2}>@{user.description}</Text>}
      </Flex>
      {props.user.role}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = query.username[0];
  if (!username || username.includes('.')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await apiGetUserInfoByName(username);

  return { props: { user: res.result || {} } };
};

export default IndexPage;
