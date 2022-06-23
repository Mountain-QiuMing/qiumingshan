import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';
import { apiSendVerifyEmail } from '../api/user/verify-email.api';
import { toast } from '@/utils/toast';
import Header from './header';
import { useStore } from '../store';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  // const verified = getCookie('verified');
  const store = useStore();
  const [loading, setLoading] = useState(false);

  const handleReSendVerifyEmail = async () => {
    setLoading(true);
    const res = await apiSendVerifyEmail();
    setLoading(false);
    if (res.status) {
      toast.success('已发送，请留意您的邮箱');
    }
  };
  return (
    <div>
      {store.token && !store.verified && (
        <Alert status="warning">
          <AlertIcon />
          <p>
            您的邮箱还没有认证，请尽快前往收件箱完成验证，否则无法使用秋名山的部分功能。没收到邮件或已过期？点击
            <Button ml="2" size="xs" isLoading={loading} onClick={handleReSendVerifyEmail}>
              重新发送
            </Button>
          </p>
        </Alert>
      )}
      <Header />
      {children}
    </div>
  );
};

export default Layout;
