import { Content, Footer, Header, Layout, Sider } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <>
      <div>
        <Layout>
          <Header>header</Header>
          <Content row={10}>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </div>
      <br />
      <div>
        <Layout>
          <Header>header</Header>
          <Layout>
            <Sider row={3}>sider</Sider>
            <Content row={7}>content</Content>
          </Layout>

          <Footer>footer</Footer>
        </Layout>
      </div>
      <br />
      <div>
        <Layout>
          <Header>header</Header>
          <Layout>
            <Content row={5}>content</Content>
            <Sider row={5}>sider</Sider>
          </Layout>

          <Footer>footer</Footer>
        </Layout>
      </div>
      <br />
      <div>
        <Layout>
          <Header>header</Header>
          <Layout>
            <Sider row={3}>sider</Sider>
            <Content row={4}>content</Content>
            <Sider row={3}>sider</Sider>
          </Layout>

          <Footer>footer</Footer>
        </Layout>
      </div>
    </>
  );
};
