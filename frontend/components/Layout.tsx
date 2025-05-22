import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = '倉庫管理システム' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <header className="header">
        <div className="header-content">
          <div className="logo">倉庫管理システム</div>
          <Navbar />
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© 2023 倉庫管理システム</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;