import React from 'react';
import { Layout, Menu } from 'antd';

import styles from './index.scss';

const { Header, Content, Footer } = Layout;

const BlogLayout: React.FC = ({ children, ...rest }) => {
  console.log(rest);
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className={styles.content}>{children}</div>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
    </Layout>
  );
};

export default BlogLayout;
