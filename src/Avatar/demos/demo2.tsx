import React from 'react';
import { Avatar } from 'happy-ui';

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Avatar style={{ marginRight: '20px' }} size={64}>
        A
      </Avatar>
      <Avatar style={{ marginRight: '20px', background: '#14a9f8' }} shape="square" size={64}>
        View
      </Avatar>
      <Avatar style={{ marginRight: '20px', background: '#00d0b8' }} shape="square">
        React
      </Avatar>
      <Avatar>
        <img src="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png" />
      </Avatar>
    </div>
  );
}
