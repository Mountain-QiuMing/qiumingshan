import { Alert, AlertIcon, Button, Container } from '@chakra-ui/react';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { apiSendVerifyEmail } from '../api/user/verify-email.api';
import { toast } from '@/utils/toast';
import Header from './header';
import { useStore } from '../store';
import { io } from 'socket.io-client';

interface LayoutProps {
  title?: string;
  header?: ReactNode;
  children: ReactNode;
  container?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, container, header }) => {
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

  useEffect(() => {
    const socket = io('ws://127.0.0.1:3002', {
      query: {
        userId: store.id,
      },
    });
    // socket.connect()
    socket.on('connect', () => {
      console.log('connected');

      store.setUserInfo({
        socket,
        socketId: socket.id,
      });

      socket.on('audit', e => {
        console.log('文章待审核', e);
      });
    });

    return () => {
      socket.disconnect();
      store.setUserInfo({
        socket: undefined,
      });
    };
  }, []);

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
      {header || <Header />}
      {container ? <Container>{children}</Container> : children}
    </div>
  );
};

Layout.defaultProps = {
  container: true,
};

export default Layout;
