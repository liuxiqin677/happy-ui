import { LazyLoad } from 'happy-ui';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        height: '200px',
        overflow: 'auto',
      }}
    >
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p>Hello Joylne!</p>
      <p style={{ color: 'red' }}>底部懒加载....</p>
      <LazyLoad delay={1000}>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
        <p>happy-ui</p>
      </LazyLoad>
    </div>
  );
};
