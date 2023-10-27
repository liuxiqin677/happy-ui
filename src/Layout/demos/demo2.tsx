import { Layout } from 'happy-ui';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;

export default () => {
  return (
    <>
      <div>
        <Layout>
          <Header extraStyle={{ background: '#9ae7d9' }}>header</Header>
          <Layout>
            <Sider
              row={3}
              extraStyle={{ fontSize: '12px', background: '#6bc9b7' }}
            >
              sider
            </Sider>
            <Content
              row={7}
              extraStyle={{ fontSize: '50px', background: '#9fd1c8' }}
            >
              content
            </Content>
          </Layout>
          <Footer extraStyle={{ background: '#9ae7d9' }}>footer</Footer>
        </Layout>
      </div>
    </>
  );
};
