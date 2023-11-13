import React, {
  CSSProperties,
  FC,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ListItem from './Item';
import './index.less';
import { IListProps } from './interface';

export const ctx = createContext<any>({});

const InternalList: FC<IListProps> = ({
  className,
  style = {},
  dataSource,
  renderItem,
  header,
  footer,
  size = 'default',
  loadMore = false,
  isVirtualList = false,
  virtualShowNum = 5,
  lazyScrollAtBottom,
}) => {
  // 处理后的数据源
  const [dealDataSource, setDealDataSource] = useState<Array<any>>(
    dataSource ? [...dataSource] : [],
  );

  useEffect(() => {
    if (isVirtualList) {
      let rowHeight = document.querySelector('.happy-list-item')
        ?.clientHeight as number;
      listItemHeight.current = rowHeight;
      setDealDataSource((prev: Array<any>) => {
        prev = dataSource.slice(0, virtualShowNum);
        return [...prev];
      });
    } else {
      setDealDataSource(dataSource);
    }
  }, [dataSource]);

  // 滚动加载更多时的样式
  const listContentStyle: CSSProperties = useMemo(() => {
    return loadMore
      ? {
          height: '400px',
          overflowY: 'scroll',
        }
      : {};
  }, [loadMore]);
  const [scrollTop, setScrollTop] = useState(0);
  const listItemHeight = useRef<number>(0);

  const listContentRef = useRef<HTMLDivElement>(null);
  const victurlListContentRef = useRef<HTMLDivElement>(null);

  // 加载更多时的回调
  const scroll = () => {
    if (loadMore) {
      // 拿到可视区域高度、元素高度、距离顶部高度
      const { scrollHeight, clientHeight, scrollTop } =
        listContentRef.current as any;
      // 距离底部的距离
      const bottomDistance = scrollHeight - clientHeight - scrollTop;
      // 距离底部距离小于 10 时，加载更多（或者说懒加载）
      if (bottomDistance <= 10) {
        lazyScrollAtBottom?.(bottomDistance, true);
      } else {
        lazyScrollAtBottom?.(bottomDistance, false);
      }
    }
  };

  // 虚拟列表滚动
  const victurlScroll = () => {
    const startIndex = Math.floor(
      ((victurlListContentRef.current as HTMLElement).scrollTop /
        listItemHeight.current) as number,
    );
    setScrollTop((victurlListContentRef.current as HTMLDivElement).scrollTop);
    setDealDataSource((prev: Array<any>) => {
      prev = dataSource.slice(startIndex, startIndex + virtualShowNum);
      return [...prev];
    });
  };

  return (
    <div className={`happy-list ${className}`} style={style}>
      <ctx.Provider
        value={{
          size,
        }}
      >
        {header && <div className="happy-list-header">{header}</div>}
        {isVirtualList ? (
          <div
            className="victurl-list-content"
            style={{
              height: `${
                (virtualShowNum * listItemHeight.current) as number
              }px`,
            }}
            ref={victurlListContentRef}
            onScroll={victurlScroll}
          >
            <div
              className="victurl-relly-content"
              style={{
                height: `${
                  ((dataSource.length * listItemHeight.current) as number) -
                  scrollTop
                }px`,
                // 要设置偏移量
                transform: `translate(0, ${scrollTop}px)`,
              }}
            >
              {Array.isArray(dealDataSource) &&
                dealDataSource.length !== 0 &&
                dealDataSource.map(renderItem)}
            </div>
          </div>
        ) : (
          <div
            className="list-content"
            style={listContentStyle}
            ref={listContentRef}
            onScroll={scroll}
          >
            {Array.isArray(dataSource) &&
              dataSource.length !== 0 &&
              dataSource.map(renderItem)}
          </div>
        )}
        {footer && <div className="happy-list-footer">{footer}</div>}
      </ctx.Provider>
    </div>
  );
};

type CompoundedComponent = React.ForwardRefExoticComponent<IListProps> & {
  Item: typeof ListItem;
};

const List = InternalList as CompoundedComponent;
List.Item = ListItem;

export default List;
