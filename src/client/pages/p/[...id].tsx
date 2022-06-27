import { apiGetPostById } from '@/api/post/publish-post';
import Layout from '@/components/layout';
import { Heading } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { Post, Tag } from 'shared/interface/post/post.interface';
import Editor from '@/components/editor';

interface HomeProps {
  post: Post;
  tagList: Tag[];
}
const Home: NextPage<HomeProps> = props => {
  const { post, tagList } = props;

  if (typeof document === 'undefined') return null;

  return (
    <Layout>
      <Heading fontSize="3xl">{post.title}</Heading>

      <div className="main">
        <Editor value={JSON.parse(post.body)} onChange={() => {}} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params.id as string;
  const { status, result } = await apiGetPostById(id);

  return {
    props: {
      post: status ? result : {},
      tagList: [],
    },
  };
};

export default Home;
