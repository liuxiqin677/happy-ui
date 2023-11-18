import {
  FC,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useCssClassManager } from '../../common/hook';
import { uuid } from '../../common/utils';
import { usePopoverPosition } from './hooks';
import './index.less';
import { IPopoverProps } from './interface';

const T = 'happy-popover';

const Popover: FC<IPopoverProps> = ({
  className = '',
  style = {},
  content,
  title,
  placement = 'left',
  trigger = 'hover',
  active = false,
  onChange,
  children,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [refPopoverTarget, setRefPopoverTarget] = useState<Element>(); // 目标元素
  const [visible, setVisible] = useState<boolean>(active);
  const currentPopoverId = uuid();
  const popoverId = useRef<string>(`happy-popover-${currentPopoverId}`);

  const classMap = {
    base: `${T} ${T}-${placement} ${className ?? ''}`,
    active: `${T}-active`,
    hidden: `${T}-hidden`,
  };
  const { classList, removeClassName, addClassName, hasClassName } =
    useCssClassManager(classMap);

  // 设置 popover 的位置
  usePopoverPosition(
    refPopoverTarget,
    popoverRef,
    visible,
    placement,
    trigger,
    setVisible,
  );

  const clearClassNames = useCallback(() => {
    removeClassName('active');
    removeClassName('hidden');
  }, []);

  // 切换显示 popover
  const togglePopover = () => setVisible(!visible);
  // 显示 popover
  const openPopover = () => setVisible(true);
  // 隐藏 popover
  const closePopover = () => setVisible(false);

  // 创建 popover 容器
  const createPopoverContent = () => {
    const popover = (
      <div
        ref={popoverRef}
        className={`happy-popover ${classList} ${className}`}
        style={{
          ...style,
        }}
        tabIndex={0}
        onBlur={closePopover}
        onMouseLeave={() => {
          if (trigger === 'hover') {
            closePopover();
          }
        }}
      >
        <div className="happy-popover-title">{title}</div>
        <div className="happy-popover-content">{content}</div>
      </div>
    );

    return createPortal(popover, document.body);
  };
  // 查找目标元素
  const findPopoverTarget = (id: string) => {
    let isFind = false;
    let query: number;
    const findTarget = () => {
      if (isFind) {
        window.cancelAnimationFrame(query);
      } else {
        const target = document.querySelector(`.${id}`);
        if (target) {
          isFind = true;
          setRefPopoverTarget(target);
        } else {
          query = window.requestAnimationFrame(findTarget);
        }
      }
    };
    // Popover 组件初始化时，目标子组件还没有初始化成功，所以轮询查找目标子组件直到找到为止
    query = window.requestAnimationFrame(findTarget);
  };

  useEffect(() => {
    findPopoverTarget(popoverId.current);
  }, []);

  // 目标元素找到后，绑定事件
  useEffect(() => {
    if (refPopoverTarget) {
      if (trigger === 'click') {
        refPopoverTarget.addEventListener('focus', togglePopover, false);
      } else if (trigger === 'hover') {
        refPopoverTarget.addEventListener('mouseenter', openPopover, false);
        refPopoverTarget.addEventListener('mouseleave', closePopover, false);
      }
    }
    return () => {
      const events = [
        ['click', togglePopover],
        ['mouseenter', openPopover],
        ['mouseleave', closePopover],
      ];
      events.forEach(([type, listener]) => {
        if (refPopoverTarget) {
          // @ts-ignore
          refPopoverTarget.removeEventListener(type, listener);
        }
      });
    };
  }, [refPopoverTarget]);
  // 监听显示隐藏的动画效果
  useEffect(() => {
    if (visible) {
      popoverRef.current?.removeEventListener('animationend', clearClassNames);
    } else {
      popoverRef.current?.addEventListener('animationend', clearClassNames);
    }
  }, [visible]);

  // 切换显示隐藏的className
  useEffect(() => {
    if (visible) {
      if (hasClassName('hidden')) {
        removeClassName('hidden');
      }
      addClassName('active');

      if (trigger === 'click') {
        setTimeout(() => popoverRef.current?.focus());
      }
    } else {
      if (hasClassName('active')) {
        removeClassName('active');
        addClassName('hidden');
      }
    }
  }, [visible]);

  useEffect(() => {
    setVisible(active);
  }, [active]);

  useEffect(() => {
    onChange && onChange(visible);
  }, [visible]);

  return (
    <>
      {cloneElement(children, {
        className: `${popoverId.current}`,
      })}
      {createPopoverContent()}
    </>
  );
};

export default Popover;
