import React, {
  FC,
  MouseEvent,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import DownOutlined from '../../components/DownOutlined';
import RightOutlined from '../../components/RightOutlined';
import { subMenuContext } from './SubMenu';
import { ctx } from './index';
import { IMenuItemProps } from './interface';

const MenuItem: FC<IMenuItemProps> = ({
  to,
  icon,
  expand = false,
  onClick,
  subMenuItem = false,
  disabled = false,
  children,
  className = '',
  indent,
  label,
}) => {
  const { expand: subMenuExpand } = useContext(subMenuContext);
  const { selectedItem, submitSelectedItem } = useContext(ctx);
  const menuId = useId();
  const [navItemClassList, setNavItemClassList] = useState(() => {
    const classes = [
      'happy-navMenuItem',
      className,
      disabled && 'happy-navMenuItem__disabled',
    ];

    return classes.filter((item) => Boolean(item)).join(' ');
  });

  const renderNavItem = () => {
    if (to) {
      return (
        <a
          className={'happy-navMenuItem__label'}
          href={to}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {label}
        </a>
      );
    } else if (!to && children) {
      return children;
    } else if (!to && !children && label) {
      return (
        <span className={'happy-navMenuItem__label'}>{label.toString()}</span>
      );
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (disabled) return;
    if (!subMenuItem) submitSelectedItem(menuId);
    if (typeof onClick === 'function') {
      onClick(event, {
        to,
        expand,
        disabled,
        label,
      });
    }
  };

  useEffect(() => {
    if (selectedItem) {
      if (selectedItem === menuId) {
        setNavItemClassList(
          (prev) => prev + ' ' + 'happy-navMenuItem__active',
        );
      } else {
        setNavItemClassList((prev) => {
          const classes = prev.split(' ');
          const result = classes
            .filter((item) => item !== 'happy-navMenuItem__active')
            .join(' ');
          return result;
        });
      }
    }
  }, [selectedItem]);

  return (
    <li
      className={navItemClassList}
      style={{
        paddingLeft: `${indent}px`,
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={handleClick}
    >
      {icon && <div className={'happy-navMenuItem__icon'}>{icon}</div>}

      {renderNavItem()}

      {subMenuItem && (
        <div className="happy-icon-arrow">
          {!subMenuExpand ? <RightOutlined /> : <DownOutlined />}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
