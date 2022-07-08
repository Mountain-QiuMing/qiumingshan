import { GetServerSideProps, NextPage } from 'next';
import Layout from '@/components/layout';
import { apiGetPostList } from '@/api/post/publish-post';
import { Post } from 'shared/interface/post/post.interface';
import { PagerData } from 'shared/interface/common/pager';
import PostItem from '../src/components/post-item';

interface IndexPageProps {
  posts: PagerData<Post[]>;
}

const IndexPage: NextPage<IndexPageProps> = props => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul>
        {props.posts.data?.map((post, index) => (
          <PostItem post={post} key={index} />
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await apiGetPostList();
  return { props: { posts: res.result || [] } };
};

export default IndexPage;
