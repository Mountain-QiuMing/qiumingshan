import React, { FC, ReactNode } from 'react';
import Header from './header';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Layout;
