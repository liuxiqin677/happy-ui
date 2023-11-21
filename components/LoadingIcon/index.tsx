import React from 'react';
import './index.less';

export default function LoadingIncon(props: { color?: string }) {
  const { color } = props;
  return (
    <div
      className="happy-loading-icon"
      style={
        color
          ? {
              borderColor: color,
              borderTopColor: 'transparent'
            }
          : {}
      }
    ></div>
  );
}
