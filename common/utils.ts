import React from 'react';

/**
 * 把隐式属性绑定到组件
 * @param nodes
 * @param hintProps
 * @returns
 */
export const bindImplicitProps = (
  nodes: Array<any>,
  hintProps: { [propsName: string]: any },
): Array<any> => {
  const result = nodes.map((node) => {
    if (node.type === 'div') {
      return node;
    } else {
      return React.cloneElement(node, { ...hintProps });
    }
  });
  return result;
};

/**
 * 是否是 Number
 * @param num
 * @returns
 */
export const isNumber = (num: any) => {
  const reg = /^-?[1-9]*(\.\d*)?$|^-?0(\.\d*)?$/;
  return !reg.test(num) ? false : true;
};

/**
 * 是否是函数
 * @param fn
 * @returns
 */
export const isFunction = (fn: any) => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

/**
 * 精确浮点数
 * @param num
 * @param precision
 * @returns
 */
export const parseFloatPrecision = (num: number, precision = 12) => {
  return +parseFloat(num.toPrecision(precision));
};

/**
 * uuid生产唯一id
 * @returns
 */
export const uuid = () => {
  const uuid = window.crypto.getRandomValues(new Uint8Array(8));

  return uuid.toString().split(',').join('');
};
