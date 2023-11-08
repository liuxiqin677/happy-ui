import { Avatar } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <Avatar.Group size={90} groupStyle={{ margin: '0 10px' }}>
      <Avatar style={{ background: '#3370ff' }}>React</Avatar>
      <Avatar style={{ background: '#14a9f8' }}>ReactUI</Avatar>
      <Avatar style={{ background: '#00d0b8' }}>ReactViewUI</Avatar>
    </Avatar.Group>
  );
};
