import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/layout';
import { BaseUserInfo } from 'shared/interface/user/user-info.interface';
import { Heading } from '@chakra-ui/react';
import { apiGetUserInfoByName } from '../src/api/user/user-info';
import { useRouter } from 'next/router';

interface IndexPageProps {
  user: BaseUserInfo;
}

const IndexPage: NextPage<IndexPageProps> = props => {
  // const route = useRouter();
  // console.log(route);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Heading> {props.user.username}</Heading>
      {props.user.role}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const username = query.username[0];
  if (!username || username === 'null' || username.includes('.')) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log(username);
  const res = await apiGetUserInfoByName(username);

  return { props: { user: res.result || {} } };
};

export default IndexPage;
