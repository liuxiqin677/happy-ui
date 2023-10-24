import React, { useState, useRef } from 'react';
import { Button, Space } from 'happy-ui';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const loadingRef = useRef<any>();

  return (
    <Space direction='vertical'>
      <div style={{marginBottom: '8px'}}>
        <Button type='primary' loading>Loading Button</Button>
      </div>
      <Button
        type='primary' 
        loading={loading}
        onClick={() => {
          if (loadingRef.current) {
            clearTimeout(loadingRef.current);
          }
          setLoading(true);
          loadingRef.current = setTimeout(() => {
            setLoading(false);
          }, 3000);
        }}
      >
        Click to Loading Button
      </Button>
    </Space>
  )
}