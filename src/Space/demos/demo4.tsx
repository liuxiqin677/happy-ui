import React, { CSSProperties } from 'react';
import { Button, Space } from 'happy-ui';

export default () => {
  const spaceAlignContaierStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  };
  const spaceAlignBlockStyle: CSSProperties = {
    flex: 'none',
    margin: '8px 4px',
    padding: '4px',
    border: '1px solid #40a9ff',
  };
  return (
    <div style={spaceAlignContaierStyle}>
      <div style={spaceAlignBlockStyle}>
        <Space align="center">
          center
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={spaceAlignBlockStyle}>
        <Space align="start">
          start
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={spaceAlignBlockStyle}>
        <Space align="end">
          end
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
      <div style={spaceAlignBlockStyle}>
        <Space align="baseline">
          baseline
          <Button type="primary">Primary</Button>
          <span className="mock-block">Block</span>
        </Space>
      </div>
    </div>
  );
};
