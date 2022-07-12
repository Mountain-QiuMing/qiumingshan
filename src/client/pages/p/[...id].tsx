import { apiGetPostById } from '@/api/post/publish-post';
import Layout from '@/components/layout';
import { Heading } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { Post, Tag } from 'shared/interface/post/post.interface';
import dynamic from 'next/dynamic';
// import Editor from '@/components/editor';
const Comment = dynamic(() => import('@/components/comment'), { ssr: false });
interface HomeProps {
  post: Post;
  tagList: Tag[];
}
const Home: NextPage<HomeProps> = props => {
  const { post, tagList } = props;

  return (
    <Layout>
      <Heading fontSize="3xl">{post.title}</Heading>

      <div className="main">{/* <Editor value={JSON.parse(post.body)} onChange={() => {}} /> */}</div>
      <Comment postId={post.id} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id[0];
  const { status, result } = await apiGetPostById(id);

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: status ? result : {},
      tagList: [],
    },
  };
};

export default Home;
