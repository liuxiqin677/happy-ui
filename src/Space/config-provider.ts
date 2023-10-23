/*
 * @Author: liuxiqin
 * @Date: 2023-10-08 15:36:41
 * @LastEditTime: 2023-10-08 15:36:41
 * @LastEditors: liuxiqin
 * @Description:
 */
import React from 'react';

export type DirectionType = 'ltr' | 'rtl' | undefined;

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string) => string;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
}

export const defaultGetPrefixCls = (suffixCls?: string) => {
  return suffixCls ? `happy-${suffixCls}` : 'happy';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});
