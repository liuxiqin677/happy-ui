/*
 * @Author: liuxiqin
 * @Date: 2023-10-18 13:52:58
 * @LastEditTime: 2023-10-18 13:53:06
 * @LastEditors: liuxiqin
 * @Description: 
 */
import { useEffect, useState } from 'react';

interface cssClass {
  base: string; // 初始状态的样式类名
  [key: string]: string;
}

export const useCssClassManager = (cssClassMap: cssClass) => {
  const [classMap, setClassMap] = useState<cssClass>({
    base: cssClassMap.base,
  });

  // 动态类名列表
  const [classList, setClassList] = useState('');

  // 移除指定类名
  const removeClassName = (classKey: string) => {
    setClassMap((prev) => {
      const template = { ...prev };
      delete template[classKey];
      return template;
    });
  };

  // 添加指定类名
  const addClassName = (classKey: string) => {
    setClassMap((prev) => ({ ...prev, [classKey]: cssClassMap[classKey] }));
  };

  useEffect(() => {
    setClassList(Object.values(classMap).join(' '));
  }, [classMap]);

  return {
    removeClassName,
    addClassName,
    classList,
  };
};
