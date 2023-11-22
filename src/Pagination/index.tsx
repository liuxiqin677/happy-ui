import cs from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import EllipsisOutlined from '../../components/EllipsisOutlined';
import LeftOutlined from '../../components/LeftOutlined';
import RightOutlined from '../../components/RightOutlined';
import Select from '../Select/index';
import './index.less';
import { IPaginationProps } from './interface';

const Pagination: FC<IPaginationProps> = ({
  className = '',
  style = {},
  current,
  defaultCurrent,
  defaultPageSize = 10,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  total,
  showSizeChanger = total && total > 50,
  onChange,
  onShowSizeChange, // pageSize 变化的回调
  showQuickJumper = false,
  size = 'default',
}) => {
  // 当前页
  const [nowIndex, setNowIndex] = useState<number>(defaultCurrent || current || 1);
  // 分页器 state
  const [pageArray, setpageArray] = useState<Array<number>>([]);
  // 分页切换器的一页条数
  const [togglePageSize, setTogglePageSize] = useState<number>(
    pageSizeOptions
      ? pageSizeOptions[0]
      : pageSize
      ? pageSize
      : defaultPageSize,
  );

  // 总页数
  const totalPage = useMemo(() => {
    const res: number = Math.ceil(total / togglePageSize);
    if (res > 6) {
      setpageArray([2, 3, 4, 5, 6]);
    } else if (res > 2) {
      const array = new Array(res - 2).fill(0);
      array.forEach((item, index) => {
        array[index] = index + 2;
      });
      setpageArray(array);
    } else {
      setpageArray([]);
    }
    return res;
  }, [total, togglePageSize]);

  //  上一页
  const changePrevPage = () => {
    if (nowIndex === 1) {
      return;
    }
    setNowIndex(nowIndex - 1);
    if (totalPage > 6) {
      if (nowIndex > totalPage - 3) {
        return;
      }
      if (nowIndex > 4) {
        setpageArray(
          pageArray.map((item: number) => {
            return item - 1;
          }),
        );
      } else if (nowIndex - 5 <= 4) {
        setpageArray([2, 3, 4, 5, 6]);
      }
    }
    onChange?.(nowIndex - 1, togglePageSize);
  };

  // 点击页码切换
  const changePage = (pageNum: number) => {
    if (totalPage <= 6) {
      setNowIndex(pageNum);
      onChange?.(pageNum, togglePageSize);
      return;
    }
    if (pageNum > 4 && pageNum <= totalPage - 4) {
      setpageArray([
        pageNum - 2,
        pageNum - 1,
        pageNum,
        pageNum + 1,
        pageNum + 2,
      ]);
    }
    if (pageNum <= 4) {
      setpageArray([2, 3, 4, 5, 6]);
    }
    // 页码到倒数第四页内的情况
    if (pageNum > totalPage - 4) {
      setpageArray([
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
      ]);
    }
    setNowIndex(pageNum);
    onChange?.(pageNum, togglePageSize);
  };

  // 下一页
  const changeNextPage = () => {
    if (nowIndex === totalPage) return;
    setNowIndex(nowIndex + 1);
    if (totalPage > 6) {
      if (nowIndex + 5 > totalPage) {
        setpageArray([
          totalPage - 5,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
        ]);
      } else if (nowIndex < 4) {
        return;
      } else if (nowIndex + 5 < totalPage) {
        setpageArray(
          pageArray.map((item: number) => {
            return item + 1;
          }),
        );
      }
    }
    onChange?.(nowIndex + 1, togglePageSize);
  };

  // 向前切换五个页码
  const changePrevFivePage = () => {
    let prevFivePage: number = 0;
    // 这种情况回到第一页
    if (nowIndex - 5 <= 4) {
      setpageArray([2, 3, 4, 5, 6]);
      prevFivePage = nowIndex - 5 <= 1 ? 1 : nowIndex - 5;
    } else if (nowIndex + 5 > totalPage) {
      // 临界点 判断
      setpageArray([
        nowIndex - 7,
        nowIndex - 6,
        nowIndex - 5,
        nowIndex - 4,
        nowIndex - 3,
      ]);
      prevFivePage = nowIndex - 5;
    } else if (nowIndex - 5 > 4) {
      // 中间翻页的情况，直接向前切换五个页码
      setpageArray(
        pageArray.map((item: number) => {
          return item - 5;
        }),
      );
      prevFivePage = nowIndex - 5;
    }
    setNowIndex(prevFivePage);
    onChange?.(prevFivePage, togglePageSize);
  };

  // 向后切换五个页码
  const changeNextvFivePage = () => {
    let nextFivePage: number = 0;
    // 向后切换如果大于总页数
    if (nowIndex + 7 >= totalPage) {
      setpageArray([
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
      ]);
      nextFivePage = nowIndex + 5 > totalPage ? totalPage : nowIndex + 5;
    } else if (nowIndex - 5 < 0) {
      setpageArray([
        nowIndex + 3,
        nowIndex + 4,
        nowIndex + 5,
        nowIndex + 6,
        nowIndex + 7,
      ]);
      nextFivePage = nowIndex + 5;
    } else if (nowIndex + 5 < totalPage) {
      setpageArray(
        pageArray.map((item: number) => {
          return item + 5;
        }),
      );
      nextFivePage = nowIndex + 5;
    }
    setNowIndex(nextFivePage);
    onChange?.(nextFivePage, togglePageSize);
  };

  // select回调
  const handleSelectCallback = (pageSize: any) => {
    setTogglePageSize(pageSize.value);
    onShowSizeChange && onShowSizeChange(nowIndex, pageSize.value);
  };

  // 跳转
  const jump = (e: any) => {
    // 如果按下的是回车
    if (e.keyCode === 13) {
      const currentJumpPage = Number(e.target.value);
      // 超出页码范围 或者输入的不是数字
      if (
        currentJumpPage > totalPage ||
        currentJumpPage < 0 ||
        isNaN(currentJumpPage)
      ) {
        return (e.target.value = '');
      }
      //   判断跳转的页码情况，设置 pageRender 状态
      if (currentJumpPage - 5 < 0) {
        setpageArray([2, 3, 4, 5, 6]);
      } else if (currentJumpPage + 5 > totalPage) {
        setpageArray([
          totalPage - 5,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
        ]);
      } else {
        setpageArray([
          currentJumpPage - 2,
          currentJumpPage - 1,
          currentJumpPage,
          currentJumpPage + 1,
          currentJumpPage + 2,
        ]);
      }
      setNowIndex(currentJumpPage);
      onChange?.(currentJumpPage, togglePageSize);
      e.target.value = '';
    }
  };

  const paginationClass = useMemo(() => {
    return cs({
      'happy-pagination': true,
      'happy-pagination-sl': size === 'small',
    });
  }, [size]);

  // 初始化 pageArray
  const init = () => {
    if (nowIndex > 4 && nowIndex <= totalPage - 4) {
      setpageArray([
        nowIndex - 2,
        nowIndex - 1,
        nowIndex,
        nowIndex + 1,
        nowIndex + 2,
      ]);
      return;
    }
    if (nowIndex > 4 && nowIndex > totalPage - 4) {
      setNowIndex(1);
      setpageArray([2, 3, 4, 5]);
      return;
    }
    if (nowIndex <= 4) {
      setpageArray([2, 3, 4, 5]);
      return;
    }
    if (nowIndex > totalPage - 4) {
      setpageArray([
        totalPage - 5,
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
      ]);
      return;
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={`${paginationClass} ${className}`} style={style}>
      {/* 上一页箭头 */}
      <div
        className={
          nowIndex === 1
            ? `happy-pagination-prev happy-pagination-disabled`
            : `happy-pagination-prev`
        }
        onClick={() => changePrevPage()}
      >
        <LeftOutlined />
      </div>
      {/* 第一页默认存在，不计入 pageArray */}
      <div
        className={
          nowIndex === 1
            ? `happy-pagination-actived happy-pagination-numberBox`
            : `happy-pagination-numberBox`
        }
        onClick={() => changePage(1)}
      >
        1
      </div>
      {/* 省略 */}
      {nowIndex > 4 && totalPage > 6 && (
        <div
          className={`happy-pagination-numberBox`}
          onClick={() => changePrevFivePage()}
        >
          <EllipsisOutlined />
        </div>
      )}
      {/* 页码渲染 */}
      {totalPage >= 1 &&
        pageArray.map((item: number, index: number) => {
          return (
            <div
              className={
                nowIndex === item
                  ? `happy-pagination-actived  happy-pagination-numberBox`
                  : `happy-pagination-numberBox`
              }
              key={index}
              onClick={() => changePage(item)}
            >
              {item}
            </div>
          );
        })}
      {/* 省略 */}
      {totalPage - nowIndex >= 4 && totalPage > 6 && (
        <div
          className={`happy-pagination-numberBox`}
          onClick={() => changeNextvFivePage()}
        >
          <EllipsisOutlined />
        </div>
      )}
      {/* 最后一页 */}
      {totalPage > 1 && (
        <div
          className={
            nowIndex === totalPage
              ? `happy-pagination-actived happy-pagination-numberBox`
              : `happy-pagination-numberBox`
          }
          onClick={() => changePage(totalPage)}
        >
          {totalPage}
        </div>
      )}
      {/* 下一页箭头 */}
      <div
        className={
          nowIndex === totalPage || totalPage <= 1
            ? `happy-pagination-next happy-pagination-disabled`
            : `happy-pagination-next`
        }
        onClick={() => changeNextPage()}
      >
        <RightOutlined />
      </div>
      {/* 切换每页条数 */}
      {Array.isArray(pageSizeOptions) && showSizeChanger && (
        <Select
          defaultValue={`${togglePageSize} 条/页`}
          option={pageSizeOptions.map((item) => {
            return {
              label: `${item} 条/页`,
              value: item,
            };
          })}
          width={100}
          onSelect={handleSelectCallback}
        />
      )}
      {/* 跳转 */}
      {showQuickJumper && (
        <div className={`happy-pagination-jumpBox`}>
          <span>跳至</span>
          <input
            type="text"
            className={`happy-pagination-jumpBox-jump`}
            onKeyUp={jump}
          />
          <span>页</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
