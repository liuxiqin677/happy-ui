/*
 * @Author: liuxiqin
 * @Date: 2023-10-19 14:01:49
 * @LastEditTime: 2023-10-19 14:10:46
 * @LastEditors: liuxiqin
 * @Description:
 */
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface ILazyLoadProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

const LazyLoad: FC<ILazyLoadProps> = ({
  children,
  className,
  style,
  delay,
}) => {
  const [showElement, setShowElement] = useState(false);
  const lazyLoadRef = useRef<HTMLDivElement>(null);
  // 观察者
  let observe: IntersectionObserver;

  const observeElements = (entries: Array<IntersectionObserverEntry>) => {
    // 监听函数
    entries.forEach((entry: IntersectionObserverEntry) => {
      // 该属性为真时，表明当前元素可见（即：目标(target)元素与设备视窗或者其他指定元素发生交集的时候执行）
      // 具体可见 https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
      if (entry.isIntersecting) {
        if (delay) {
          setTimeout(() => {
            setShowElement(true);
          }, delay);
        } else {
          setShowElement(true);
        }
      }
    });
  };

  useEffect(() => {
    observe = new IntersectionObserver((entries) => observeElements(entries));
    observe.observe(lazyLoadRef.current as Element);
  }, []);

  return (
    <div
      className={`happy-lazyload ${className}`}
      style={style}
      ref={lazyLoadRef}
    >
      {showElement && children}
    </div>
  );
};

export default LazyLoad;
