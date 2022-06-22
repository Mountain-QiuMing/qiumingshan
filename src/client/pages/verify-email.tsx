import { GetServerSideProps } from 'next';
import { apiVerifyEmail } from '../api/user/verify-email.api';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import Link from 'next/link';

interface VerifyEmailPageProps {
  message: string;
}

const VerifyEmailPage = (props: VerifyEmailPageProps) => {
  const { message } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      {message ? (
        <Alert status="warning">
          <AlertIcon />
          {message}
        </Alert>
      ) : (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            验证成功！
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            您的邮箱已经验证成功，现在可以开始正常使用秋名山的全部功能了。
          </AlertDescription>
        </Alert>
      )}

      <Button mt={8}>
        <Link href="/" replace>
          返回首页
        </Link>
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<VerifyEmailPageProps> = async ({ query }) => {
  const res = await apiVerifyEmail({ accessToken: query.accessToken as string });
  if (res.status) {
    return {
      props: {
        message: res.message,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default VerifyEmailPage;
