import { Avatar } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Avatar.Group size={60} groupStyle={{ margin: '0 10px' }}>
      <Avatar>A</Avatar>
      <Avatar style={{ background: '#14a9f8' }} shape="square">
        View
      </Avatar>
      <Avatar style={{ background: '#00d0b8' }} shape="square">
        React
      </Avatar>
      <Avatar>
        <img src="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png" />
      </Avatar>
    </Avatar.Group>
  );
};
