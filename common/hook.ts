import { useEffect, useRef, useState } from 'react';

interface cssClass {
  base: string; // 初始状态的样式类名
  [key: string]: string;
}

/**
 * 类名管理 hook
 * @param cssClassMap class类名map
 * @returns 
 */
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

  // 是否有指定类名
  const hasClassName = (className: string) => {
    return Object.keys(classMap).find((c: string) => c === className);
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
    hasClassName,
    classList,
  };
};

/**
 * 第一次挂载时不执行，后续再执行
 * @param callback 回调
 * @param deps 依赖
 */
export const useCallbackAfterFirstMounted = (
  callback: Function,
  deps: Array<any>,
) => {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    callback && callback();
  }, deps);
};
