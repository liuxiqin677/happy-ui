import cs from 'classnames';
import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import DownOutlined from '../../components/DownOutlined';
import RightOutlined from '../../components/RightOutlined';
import './index.less';
import { IDropdownProps, dataType } from './interface';

const Dropdown: FC<IDropdownProps> = ({
  placeholder = 'Please select',
  data,
  className,
  style,
  disabled,
  type = 'click',
  status = 'default',
  position = 'bottom',
}) => {
  const [visible, setVisible] = useState(false);
  const [dropValue, setDropValue] = useState(placeholder);
  const [dropData, setDropData] = useState<Array<string | dataType>>(data);
  const dropdownDomRef = useRef<any>(null);
  const dropDownClass = cs(className, 'happy-dropdown');

  useEffect(() => {
    setDropData((data) => {
      return data?.map((item: string | dataType) => {
        if (typeof item !== 'string' && item?.children) {
          return {
            ...item,
            visible: false,
          };
        }
        return item;
      });
    });
    if (type === 'click') {
      dropdownDomRef.current?.addEventListener('click', reset);
    }

    return () => {
      if (type === 'click') {
        dropdownDomRef.current?.removeEventListener('click', reset);
      }
    };
  }, []);

  // reset操作
  const reset = () => {
    setVisible(false);
    closeAllChild();
  };

  // 关闭所有子项
  const closeAllChild = () => {
    setDropData((data) => {
      return data.map((item: string | dataType) => {
        if (typeof item !== 'string' && item?.children) {
          return {
            ...item,
            visible: false,
          };
        }
        return item;
      });
    });
  };

  // 移入移除子项
  const hoverInDropOption = (item: string | dataType, status: boolean) => {
    if (typeof item !== 'string' && item?.children && type === 'hover') {
      setDropData((data) => {
        return data.map((subItem: string | dataType) => {
          if (typeof subItem !== 'string' && item === subItem) {
            return {
              ...subItem,
              visible: status,
            };
          }
          return subItem;
        });
      });
    }
  };

  // 点击子项触发
  const changeDropVal = (item: string | dataType, e: any) => {
    e.stopPropagation();
    if (typeof item !== 'string' && item.disabled) return;
    if (typeof item === 'string') {
      // 选中
      setDropValue(item);
      setVisible(false);
      closeAllChild();
    } else {
      if (item?.children && type === 'click') {
        setDropData((data) => {
          return data.map((subItem: string | dataType) => {
            if (typeof subItem !== 'string' && item === subItem) {
              return {
                ...subItem,
                visible: true,
              };
            }
            return subItem;
          });
        });
      } else if (item?.children && type === 'hover') {
      } else {
        // 选中
        setDropValue(item.content);
        setVisible(false);
        closeAllChild();
        if (item.link) {
          window.location.href = item.link;
        }
      }
    }
  };

  // hover 移入事件
  const hoverMouseEvent = (
    eventType: 'enter' | 'leave',
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (disabled || type !== 'hover') return;
    e.stopPropagation();
    setVisible(eventType === 'enter');
  };

  const Option: FC<{
    item: string | dataType;
    key: number;
    children?: ReactNode;
  }> = ({ item, key, children }) => {
    return (
      <div
        className={cs(
          'happy-dropdown-option-list',
          typeof item !== 'string' && item.disabled ? 'list-disabled' : '',
        )}
        key={key + Math.random()}
        onClick={(e) => changeDropVal(item, e)}
        onMouseEnter={() => hoverInDropOption(item, true)}
        onMouseLeave={() => hoverInDropOption(item, false)}
      >
        {typeof item !== 'string' && item.icon && item.icon}
        <div className="list-option">
          {typeof item === 'string' ? item : item?.content}
        </div>
        {children}
      </div>
    );
  };

  // 渲染列表
  const listELementRender = useMemo(() => {
    // 常规下拉
    return dropData?.map((item, index) => {
      return (
        <Option item={item} key={index + Math.random()}>
          {typeof item !== 'string' && item?.children && (
            <div className="drop-down-icon">
              <RightOutlined />
            </div>
          )}
          {typeof item !== 'string' && item?.children && item.visible ? (
            <div className="sub-list">
              {item?.children.map((subItem, subIndex) => {
                return (
                  <div
                    className={cs(
                      'sub-list-item',
                      typeof subItem !== 'string' && subItem.disabled
                        ? 'sub-list-item-disabled'
                        : '',
                    )}
                    key={subIndex}
                    onClick={(e) => changeDropVal(subItem, e)}
                  >
                    {typeof subItem !== 'string' &&
                      subItem.icon &&
                      subItem.icon}
                    <div className="list-option">
                      {typeof subItem === 'string' ? subItem : subItem?.content}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </Option>
      );
    });
  }, [status, dropValue, visible, dropData, position]);

  return (
    <div className={dropDownClass} style={style} ref={dropdownDomRef.current}>
      <div
        className={cs(
          'happy-dropdown-result',
          `happy-dropdown-result-${status}`,
          disabled ? 'happy-dropdown-result-disabled' : '',
          visible ? `happy-dropdown-result-${status}-active` : '',
        )}
        onClick={(e) => {
          if (disabled || type !== 'click') return;
          e.stopPropagation();
          setVisible(!visible);
        }}
        onMouseEnter={(e) => hoverMouseEvent('enter', e)}
        onMouseLeave={(e) => hoverMouseEvent('leave', e)}
      >
        {dropValue}
        <div className="drop-icon">
          <DownOutlined />
        </div>
      </div>
      {visible && (
        <div
          className={cs(
            'happy-dropdown-content',
            `happy-dropdown-content-${position}`,
          )}
          onMouseEnter={(e) => hoverMouseEvent('enter', e)}
          onMouseLeave={(e) => hoverMouseEvent('leave', e)}
        >
          {listELementRender}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
