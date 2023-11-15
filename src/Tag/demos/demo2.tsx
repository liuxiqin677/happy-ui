import { Divider, Space, Tag } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <>
      <Space direction="vertical">
        <Divider>Preset</Divider>
        <Space wrap>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </Space>
      </Space>
      <Space style={{ width: '100%' }} direction="vertical">
        <Divider>Custom</Divider>
        <Space>
          <Tag color="#f50">#f50</Tag>
          <Tag color="#2db7f5">#2db7f5</Tag>
          <Tag color="#87d068">#87d068</Tag>
          <Tag color="#108ee9">#108ee9</Tag>
        </Space>
      </Space>
    </>
  );
};
