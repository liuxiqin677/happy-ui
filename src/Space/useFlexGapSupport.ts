/*
 * @Author: liuxiqin
 * @Date: 2023-10-08 15:25:41
 * @LastEditTime: 2023-10-08 15:54:07
 * @LastEditors: liuxiqin
 * @Description: 
 */

/**
 * 这样组件里就可以就可以用这个 hook 来判断是否支持 gap，从而设置不同的样式了：
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
