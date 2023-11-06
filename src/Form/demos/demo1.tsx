import { Button, Form, Input, Radio } from 'happy-ui';
import React, { useState } from 'react';

export default () => {
  const [align, setAlign] = useState<'horizontal' | 'vertical'>('horizontal');

  const onChange = (val: any) => {
    setAlign(val);
  };

  return (
    <div>
      <Radio.Group value={align} onChange={onChange}>
        <Radio value={'horizontal'}>horizontal</Radio>
        <Radio value={'vertical'}>vertical</Radio>
      </Radio.Group>

      <Form layout={align} style={{ width: '600px' }}>
        <Form.Item label="Username">
          <Input placeholder="Please enter your usename" width={300} />
        </Form.Item>
        <Form.Item label="Post">
          <Input placeholder="Please enter your post" width={300} />
        </Form.Item>
        <Form.Item wrapperTol={5}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
