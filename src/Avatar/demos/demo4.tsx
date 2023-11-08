import React from 'react';
import { Avatar } from 'happy-ui';
import ErrorIcon from '../../../components/ErrorIcon';
import CloseIcon from '../../../components/CloseIcon';

export default () => {
  const triggerClick = () => {
    console.log('click!');
  };
  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        size={54}
        style={{ marginRight: '20px' }}
        triggerType="mask"
        triggerIcon={<ErrorIcon />}
        triggerClick={triggerClick}
      >
        A
      </Avatar>
      <Avatar
        size={54}
        style={{ marginRight: '20px', background: '#14a9f8' }}
        triggerIcon={<CloseIcon />}
        triggerClick={triggerClick}
      >
        View
      </Avatar>
    </div>
  );
}
