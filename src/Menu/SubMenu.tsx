import React, {
  FC,
  TransitionEvent,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { bindImplicitProps } from '../../common/utils';
import MenuItem from './MenuItem';
import { ctx } from './index';
import { ISubMenuProps } from './interface';

const ITEM_HEIGHT = 50;
const NEST_ITEM_INDENT = 20;

export const subMenuContext = createContext<any>({});

const SubMenu: FC<ISubMenuProps> = ({
  children,
  expand = false,
  label,
  indent = NEST_ITEM_INDENT,
  lastExpandItem,
  submitExpandId,
  icon
}) => {
  const { single } = useContext(ctx);
  const [menuExpand, setExpand] = useState(() => expand);
  const refSubNavContainer = useRef<HTMLDivElement>(null);
  const [lastExpandItemIndex, setLastExpandItemIndex] = useState<
    number | undefined
  >();
  const menuId = useId();

  // 计算 submenu 的高度，用来做 transition 过度效果
  const setComputedHeightToContainer = () => {
    if (refSubNavContainer.current) {
      const { clientHeight } = refSubNavContainer.current;
      refSubNavContainer.current.style.height = clientHeight + 'px';
      return clientHeight;
    }
  };

  useEffect(() => {
    if (menuExpand) {
      submitExpandId(menuId);
    }
  }, [menuExpand]);

  // 关闭上一个最后打开的菜单
  useEffect(() => {
    if (!single) return;

    if (lastExpandItem !== undefined && lastExpandItem !== menuId) {
      setComputedHeightToContainer();
      setExpand(false);
    }
  }, [lastExpandItem]);

  // 把下面的 props 传给 submenu
  const childNodes = bindImplicitProps(React.Children.toArray(children), {
    indent: indent + NEST_ITEM_INDENT,
    lastExpandItem: lastExpandItemIndex,
    submitExpandId: setLastExpandItemIndex,
  });
  const initialHeight = childNodes.length * ITEM_HEIGHT + 'px';
  const [lastHeight, setLastHeight] = useState<number>();

  const handleClick = () => {
    if (menuExpand && refSubNavContainer.current) {
      const clientHeight = setComputedHeightToContainer();
      setLastHeight(clientHeight);
    }

    setTimeout(() => setExpand(!menuExpand), 50);
  };

  const [expandHeight, setExpandHeight] = useState<{
    height: string | number;
  }>({ height: 0 });

  useEffect(() => {
    let height: string | number;
    if (menuExpand) {
      height = lastHeight || initialHeight;
    } else {
      height = 0;
    }
    setExpandHeight((prev) => ({ ...prev, height }));
  }, [menuExpand]);

  const keepChildItemExpandable = (e: TransitionEvent) => {
    if (e.propertyName !== 'height' && e.propertyName !== 'width') return;

    let height: string | number;
    if (menuExpand) {
      height = 'auto';
    } else {
      height = 0;
    }
    setExpandHeight((prev) => ({ ...prev, height }));
  };

  return (
    <subMenuContext.Provider
      value={{
        expand: menuExpand,
      }}
    >
      <ul className="happy-subNavMenu">
        <MenuItem
          icon={icon}
          className="happy-subNavMenu__title"
          expand={menuExpand}
          indent={indent}
          onClick={handleClick}
          label={label}
          subMenuItem
        ></MenuItem>

        <div
          className="happy-subNavMenu__items"
          style={expandHeight}
          ref={refSubNavContainer}
          onTransitionEnd={keepChildItemExpandable}
        >
          {childNodes}
        </div>
      </ul>
    </subMenuContext.Provider>
  );
};

export default SubMenu;
