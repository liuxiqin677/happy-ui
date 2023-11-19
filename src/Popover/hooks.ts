import {
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TPlacement, TTriggerWay } from './interface';

/**
 * 用递归的方式逐级向上查找目标元素的父节点，直到顶层
 * 这个过程中进行判断，如果当前层级的父节点发生了内容溢出，那么就说明它可以是目标元素的滚动容器
 * 就这样收集到所有父级容器，然后给它们加上scroll事件监听，获取到我们最终需要的滚动距离
 * @param visible  可见状态
 * @param onScroll 滑动回调
 * @returns
 */
function useScrollContainer(visible: boolean, onScroll: Function) {
  // 状态标识：是否找完成了滚动容器的查找，递归的终止条件
  const [hasParents, setHasParents] = useState(false);
  // 滚动容器集合
  const [parentList, setParentList] = useState<Array<Element>>([]);

  // 滚动事件回调
  const scroll = useCallback((e: Event) => onScroll(e), []);

  // 绑定滚动事件监听
  const watchScroll = () => {
    if (parentList.length) {
      parentList.forEach((element) => {
        element.addEventListener('scroll', scroll);
      });
    }
  };

  // 解除绑定滚动事件监听
  const unWatchScroll = () => {
    if (parentList.length) {
      parentList.forEach((element) => {
        element.removeEventListener('scroll', scroll);
      });
    }
  };

  // 查找父级滚动容器
  const findScrollContainerParents = (node: Element) => {
    if (!node) return;

    const parent = node.parentElement;
    if (parent) {
      if (parent.scrollHeight > parent.clientHeight) {
        setParentList((prev) => [...prev, parent]);
      } else {
        findScrollContainerParents(parent);
      }
    }
  };

  // popover 被激活时监听滚动事件，隐藏时解除监听
  useEffect(() => {
    if (visible) {
      watchScroll();
    } else {
      unWatchScroll();
    }

    return () => unWatchScroll();
  }, [parentList, visible]);

  return {
    hasParents,
    parentList,
    setHasParents,
    findScrollContainerParents,
  };
}

/**
 *
 * @param popoverTarget 目标元素 dom
 * @param popover popover 容器的 dom
 * @param visible 是否可见
 * @param position 弹出位置
 * @param trigger 触发方式
 * @param setVisible 可见状态回调
 */
function usePopoverPosition(
  popoverTarget: Element | undefined,
  popover: MutableRefObject<HTMLDivElement | null>,
  visible: boolean,
  position: TPlacement,
  trigger: TTriggerWay,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const scrollBarPosition = useRef([0, 0]);
  const popoverPosition = useRef([0, 0]);
  const firstScrollFlag = useRef(false);

  const onScroll = (e: MouseEvent) => {
    if (trigger === 'hover') {
      setVisible(false);
      return;
    }

    const { scrollLeft, scrollTop } = e.target as HTMLElement;
    if (!firstScrollFlag.current) {
      scrollBarPosition.current = [scrollLeft, scrollTop];
      firstScrollFlag.current = true;
    }

    // Popover 容器元素的位置
    const [x, y] = popoverPosition.current;
    // 滚动的起始位置，因为滚动条并不是从 0 开始的，假如激活弹出框的时候，滚动条已经存在了一段距离，那么我们在计算滚动位置的时候就需要加上这一段滚动距离
    const [exitLeft, exitTop] = scrollBarPosition.current;
    // 同步滚动位置到 Popover 容器元素
    window.requestAnimationFrame(() => {
      (popover.current as HTMLElement).style.left = `${
        x - scrollLeft + exitLeft
      }px`;
      (popover.current as HTMLElement).style.top = `${
        y - scrollTop + exitTop
      }px`;
    });
  };

  const { hasParents, setHasParents, findScrollContainerParents } =
    useScrollContainer(visible, onScroll);

  const calcStaticPos = () => {
    if (popoverTarget && visible) {
      // 目标元素的位置、尺寸
      const targetPos = popoverTarget.getBoundingClientRect();
      const {
        x: targetX, // 目标元素的横坐标
        y: targetY, // 目标元素的纵坐标
        width: targetW, // 目标元素的宽
        height: targetH, // 目标元素的高
      } = targetPos;

      let sourceW = 0,
        sourceH = 0;
      if (popover.current) {
        const { width, height } = popover.current.getBoundingClientRect();
        [sourceW, sourceH] = [width, height];
      }

      let left = 0,
        top = 0;
      // 计算 popover 的位置
      if (position === 'left') {
        left = targetX - sourceW - 12;
        top = targetY + (targetH - sourceH) / 2;
      } else if (position === 'right') {
        left = targetX + targetW + 12;
        top = targetY + (targetH - sourceH) / 2;
      } else if (position === 'top') {
        left = targetX + (targetW - sourceW) / 2;
        top = targetY - sourceH - 12;
      } else if (position === 'bottom') {
        left = targetX + (targetW - sourceW) / 2;
        top = targetY + targetH + 12;
      }

      popoverPosition.current = [left, top];
      (popover.current as HTMLElement).style.left = `${left}px`;
      (popover.current as HTMLElement).style.top = `${top}px`;
    }
  };

  useLayoutEffect(() => {
    calcStaticPos();

    if (popoverTarget && visible && !hasParents) {
      findScrollContainerParents(popoverTarget);
      setHasParents(true);
    }
  }, [popoverTarget, visible]);

  useEffect(() => {
    if (visible) {
      firstScrollFlag.current = false;
    }
  }, [visible]);
}

export { usePopoverPosition };
