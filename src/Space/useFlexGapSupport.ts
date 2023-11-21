/**
 * 判断是否支持 gap，从而设置不同的样式了：
 */
import * as React from 'react';
import { detectFlexGapSupported } from './styleChecker';

export default () => {
  const [flexible, setFlexible] = React.useState(false);
  React.useEffect(() => {
    setFlexible(detectFlexGapSupported());
  }, []);

  return flexible;
};
