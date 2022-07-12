import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/layout';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import { Avatar, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { apiGetUserInfoByName } from '../src/api/user/user-info';
import dateUtil from '../src/utils/date';

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
        <Text fontSize="sm">注册时间：{dateUtil(user.createTime).format('YYYY-MM-DD')}</Text>
        {user.description && <Text ml={2}>@{user.description}</Text>}
      </Flex>
      <Tabs isLazy mt={4}>
        <TabList>
          <Tab>文章</Tab>
          <Tab>提问</Tab>
          <Tab>回答</Tab>
          <Tab>评论</Tab>
          <Tab>点赞</Tab>
          <Tab>收藏</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>文章</TabPanel>
          <TabPanel>提问</TabPanel>
          <TabPanel>回答</TabPanel>
          <TabPanel>评论</TabPanel>
          <TabPanel>点赞</TabPanel>
          <TabPanel>收藏</TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!(params && params.username && Array.isArray(params.username)))
    throw Error('getServerSideProps: wrong parameters.');
  const [username] = params.username.reverse();

  const res = await apiGetUserInfoByName(username);

  if (!res.status || !res.result) {
    return {
      notFound: true,
    };
  }

  return { props: { user: res.result || {} } };
};

export default IndexPage;
