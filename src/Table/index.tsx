import cs from 'classnames';
import React, { FC, createRef, useCallback, useEffect, useState } from 'react';
import CaretDownOutlined from '../../components/CaretDownOutlined';
import CaretUpOutlined from '../../components/CaretUpOutlined';
import PlusOutlined from '../../components/PlusOutlined';
import SearchOutlined from '../../components/SearchOutlined';
import CheckBox from '../CheckBox';
import Input from '../Input';
import Pagination from '../Pagination';
import Popover from '../Popover';
import './index.less';
import { ITableProps, TTableThType } from './interface';

let sTop = 0;
const options = [10, 20, 30, 50];
const PaginationAlignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Table: FC<ITableProps> = ({
  className,
  style,
  columns,
  data,
  align = 'left',
  expandedRowRender,
  radio,
  checked,
  onRadioCallback,
  onCheckedCallback,
  filter,
  sortable,
  virtualized,
  virtualListNum = 10,
  lazyLoad,
  pagination,
  paginationAlign = 'right',
  pageSizeOption,
  onPageNumberChange,
  onPageSizeChange,
}) => {
  const [doColumnData, setDoColumnData] = useState(columns); // 表头数据
  const [doTableData, setDoTableData] = useState(data); // 表数据
  const [radioRow, setRadioRow] = useState({}); // 单选选中行
  const [checkedRow, setCheckedRow] = useState<Array<object>>([]); // 单选选中行
  const [scrollTop, setScrollTop] = useState(0);
  const [pageSize, setPageSize] = useState(options[0]);

  const scrollDom = createRef();

  const classNames = cs(className, `happy-table-container`);

  useEffect(() => {
    let newDoTableData = [...doTableData];
    if (expandedRowRender) {
      // 展开行处理
      newDoTableData.forEach((item: any) => {
        item.openLine = '';
      });
    }
    if (sortable) {
      // 排序处理
      setDoColumnData((old) => {
        old.forEach((item: any) => {
          // 如果 sort 是数组，则是自定义排序
          if (Array.isArray(item.sorter)) {
            item.sorter = item.sorter.map((s: Function) => {
              return {
                fn: s,
                sorted: false,
              };
            });
          }
        });
        return [...old];
      });
    }
    if (virtualized || lazyLoad) {
      newDoTableData = newDoTableData.slice(0, virtualListNum || 10);
    }
    if (pagination) {
      newDoTableData = newDoTableData.slice(0, pageSize);
    }
    setDoTableData(newDoTableData);
  }, []);

  const tableStyle = useCallback(
    (thData: any) => {
      // 表头样式
      const styleResult = {
        width: 'auto',
        // width: `${100 / columns.length}%`
      };
      if (thData?.width) {
        styleResult.width = `${thData.width}px`;
      }
      return styleResult;
    },
    [columns],
  );

  // 展开列表
  const openRow = (row: object, key: number): void => {
    if (expandedRowRender) {
      expandedRowRender(row);
      const newTableData = [...doTableData];
      if (newTableData[key].openLine) {
        newTableData[key].openLine = '';
      } else {
        if (expandedRowRender(row)) {
        }
        newTableData[key].openLine = expandedRowRender(row);
      }
      setDoTableData(newTableData);
    }
  };

  // 单选行
  const radioSelectRow = (row: object): void => {
    setRadioRow(row);
    onRadioCallback && onRadioCallback(row);
  };

  // 多选单行
  const checkedSelectRow = <T,>(checked: boolean, row: T): void => {
    setCheckedRow((old: any) => {
      if (checked) {
        old.push(row);
      } else {
        const delIndex = old.findIndex((s: T) => s === row);
        old.splice(delIndex, 1);
      }
      onCheckedCallback && onCheckedCallback(old);
      return [...old];
    });
  };
  // 全选
  const checkAll = (checked: boolean): void => {
    setCheckedRow((old: Array<object>) => {
      if (checked) {
        // 全选
        old = doTableData;
      } else {
        // 全不选
        old = [];
      }
      onCheckedCallback && onCheckedCallback(old);
      return [...old];
    });
  };

  // 表格单列排序  -> 2为升序 3为降序
  const sortColumn = (index: number, row: any, sortType: number) => {
    const sortKey = row.dataIndex;
    const newTableData = [...doTableData];
    // 自定义排序
    if (Array.isArray(row.sorter) && typeof row.sorter[0] === 'object') {
      newTableData.sort(row.sorter[sortType - 2].fn);
      setDoTableData(newTableData);
      setDoColumnData((old: Array<any>): Array<any> => {
        if (sortType === 2) {
          old[index].sorter[0].sorted = true;
          old[index].sorter[1].sorted = false;
        } else {
          old[index].sorter[0].sorted = false;
          old[index].sorter[1].sorted = true;
        }

        return [...old];
      });
    } else {
      // 默认排序
      newTableData.sort((a, b) => {
        return sortType === 2
          ? a[sortKey] - b[sortKey]
          : b[sortKey] - a[sortKey];
      });
      setDoTableData(newTableData);
      setDoColumnData((old) => {
        old[index].sorter = sortType;
        return [...old];
      });
    }
  };

  //筛选 input 回调
  const handleIptChange = (v: string | boolean, t: TTableThType) => {
    setDoColumnData((old: Array<TTableThType>) => {
      old.forEach((item: TTableThType) => {
        if (item === t) {
          if (item.filter !== undefined) item.filter = v;
        }
      });
      return [...old];
    });
  };

  // 过滤列表
  const filterList = (t: TTableThType) => {
    setDoTableData((old: Array<object>) => {
      if (t.filter === true) {
        old = data;
      } else {
        old = data.filter((item) => {
          return String(item[t.dataIndex]).includes(t.filter as string);
        });
      }
      return [...old];
    });
  };

  // 渲染 td
  const renderContentTd = (rowData: object) => {
    return Object.entries({
      ...rowData,
      render: null,
    }).map((value: any, key) => {
      if (value[0] !== 'openLine') {
        return (
          <td key={key} style={{ textAlign: align ? (align as any) : 'left' }}>
            {doColumnData[key]?.render
              ? doColumnData[key]?.render?.(rowData)
              : value[1]}
          </td>
        );
      }
    });
  };

  // 排序 icon style
  const sortIconStyle = useCallback(
    (thRow: any, iconType: number) => {
      // 表头排序按钮样式
      if (
        typeof thRow.sorter === 'number' ||
        typeof thRow.sorter === 'boolean'
      ) {
        // 默认排序
        if (iconType === 0) {
          // 升序箭头
          return {
            color: thRow.sorter === 2 ? '#325DFF' : '#a9adb2',
          };
        }
        // 降序箭头
        return {
          color: thRow.sorter === 3 ? '#325DFF' : '#a9adb2',
        };
      }
      // 自定义排序
      if (iconType === 0) {
        // 升序箭头
        return {
          color: thRow.sorter[0].sorted ? '#325DFF' : '#a9adb2',
        };
      }
      // 降序箭头
      return {
        color: thRow.sorter[1].sorted ? '#325DFF' : '#a9adb2',
      };
    },
    [columns, doColumnData],
  );

  // 虚拟列表或懒加载滚当时
  const scrollTable = (e: any) => {
    if (virtualized) {
      // 虚拟加载
      const top = (scrollDom.current as any).scrollTop;
      // 滚到底，不继续滚
      if (
        data.length *
          (document.querySelector('.victurl-scroll-tr') as any)?.offsetHeight -
          sTop <
          virtualListNum *
            (document.querySelector('.victurl-scroll-tr') as any)
              ?.offsetHeight &&
        top > sTop
      ) {
        return;
      }
      const listHeight =
        (document.querySelector('.victurl-scroll-tr') as any)?.offsetHeight ||
        40;
      sTop = top;
      setScrollTop(top);
      setDoTableData((old) => {
        const showNum = virtualListNum || 10;
        old = data.slice(
          Math.floor(top / listHeight),
          Math.floor(top / listHeight) + showNum,
        );
        return [...old];
      });
    } else if (lazyLoad) {
      // 懒加载
      if (
        // 滚动到底部了，切割旧数据
        e.nativeEvent.target.scrollHeight -
          e.nativeEvent.target.clientHeight -
          e.nativeEvent.target.scrollTop <=
        10
      ) {
        setTimeout(() => {
          setDoTableData((old) => {
            old = [
              ...old,
              ...data.slice(old.length + 1, old.length + virtualListNum + 1),
            ];
            return [...old];
          });
        }, 300);
      }
    }
  };

  // 页码改变
  const changePageCallback = (pageNum: number) => {
    // 页码改变回调
    setDoTableData((old) => {
      old = data.slice(
        (pageNum - 1) * pageSize,
        (pageNum - 1) * pageSize + pageSize,
      );
      return [...old];
    });
    onPageNumberChange &&
      onPageNumberChange(
        pageNum,
        data.slice(
          (pageNum - 1) * pageSize,
          (pageNum - 1) * pageSize + pageSize,
        ),
      );
  };

  // 一页内容条数改变
  const changePageSizeCallback = (pageSize: number) => {
    // 页数改变回调
    setPageSize(pageSize);
    setDoTableData((old) => {
      old = data.slice(0, pageSize);
      return [...old];
    });
    onPageSizeChange && onPageSizeChange(pageSize, data.slice(0, pageSize));
  };

  // 滚动列表渲染
  const renderScrollList = useCallback(() => {
    return doTableData?.map((t, key) => {
      return (
        <>
          <tr key={key} className="victurl-scroll-tr">
            {expandedRowRender && (
              <td
                style={{
                  textAlign: (align as any) || 'left',
                  cursor: 'pointer',
                }}
                onClick={() => openRow(t, key)}
              >
                <PlusOutlined />
              </td>
            )}
            {radio && (
              <td
                style={{
                  textAlign: (align as any) || 'left',
                  cursor: 'pointer',
                }}
              >
                <input
                  className="radioBox"
                  type="radio"
                  checked={radioRow === t}
                  onClick={() => radioSelectRow(t)}
                />
              </td>
            )}
            {checked && (
              <td
                style={{
                  textAlign: (align as any) || 'left',
                  cursor: 'pointer',
                }}
              >
                <CheckBox
                  checked={checkedRow.indexOf(t) !== -1}
                  onChange={(check: boolean) => checkedSelectRow(check, t)}
                >
                  {checkedRow.indexOf(t) === -1}
                </CheckBox>
              </td>
            )}
            {renderContentTd(t)}
          </tr>
          {t.openLine && (
            <tr>
              <td
                style={{ textAlign: (align as any) || 'left' }}
                colSpan={Object.keys(doTableData[0]).length + 1}
              >
                {t.openLine}
              </td>
            </tr>
          )}
        </>
      );
    });
  }, [doTableData, sTop, scrollTop, checkedRow, radioRow]);

  // table 常规内容渲染
  const tableNormalContentRender = () => {
    // 常规表渲染
    return (
      <tbody>
        {
          // 常规表正文
          doTableData?.map((t, key) => {
            return (
              <>
                <tr key={key}>
                  {
                    // 展开行
                    expandedRowRender && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                        onClick={() => openRow(t, key)}
                      >
                        <PlusOutlined />
                      </td>
                    )
                  }
                  {
                    // 单选
                    radio && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          className="radioBox"
                          type="radio"
                          checked={radioRow === t}
                          onClick={() => radioSelectRow(t)}
                        />
                      </td>
                    )
                  }
                  {
                    // 多选
                    checked && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <CheckBox
                          checked={checkedRow.indexOf(t) !== -1}
                          onChange={(check: boolean) =>
                            checkedSelectRow(check, t)
                          }
                        >
                          {checkedRow.indexOf(t) === -1}
                        </CheckBox>
                      </td>
                    )
                  }
                  {renderContentTd(t)}
                </tr>
                {t.openLine && (
                  <tr>
                    <td
                      style={{ textAlign: (align as any) || 'left' }}
                      colSpan={Object.keys(doTableData[0]).length + 1}
                    >
                      {t.openLine}
                    </td>
                  </tr>
                )}
              </>
            );
          })
        }
      </tbody>
    );
  };

  // table 懒加载或者分页时内容渲染
  const tableContentRender = () => {
    // 懒加载
    if (lazyLoad) {
      // 懒加载
      return (
        <tbody>
          {doTableData?.map((t, key) => {
            return (
              <>
                <tr key={key}>
                  {
                    // 展开行
                    expandedRowRender && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                        onClick={() => openRow(t, key)}
                      >
                        <PlusOutlined />
                      </td>
                    )
                  }
                  {
                    // 单选
                    radio && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          className="radioBox"
                          type="radio"
                          checked={radioRow === t}
                          onClick={() => radioSelectRow(t)}
                        />
                      </td>
                    )
                  }
                  {
                    // 多选
                    checked && (
                      <td
                        style={{
                          textAlign: (align as any) || 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <CheckBox
                          checked={checkedRow.indexOf(t) !== -1}
                          onChange={(check: boolean) =>
                            checkedSelectRow(check, t)
                          }
                        >
                          {checkedRow.indexOf(t) === -1}
                        </CheckBox>
                      </td>
                    )
                  }
                  {renderContentTd(t)}
                </tr>
                {t.openLine && (
                  <tr>
                    <td
                      style={{ textAlign: (align as any) || 'left' }}
                      colSpan={Object.keys(doTableData[0]).length + 1}
                    >
                      {t.openLine}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      );
    }
    // 分页
    if (pagination) {
      // 分页渲染
      return (
        <tbody>
          {
            // 常规表正文
            doTableData?.map((t, key) => {
              return (
                <>
                  <tr key={key}>
                    {
                      // 展开行
                      expandedRowRender && (
                        <td
                          style={{
                            textAlign: (align as any) || 'left',
                            cursor: 'pointer',
                          }}
                          onClick={() => openRow(t, key)}
                        >
                          <PlusOutlined />
                        </td>
                      )
                    }
                    {
                      // 单选
                      radio && (
                        <td
                          style={{
                            textAlign: (align as any) || 'left',
                            cursor: 'pointer',
                          }}
                        >
                          <input
                            className="radioBox"
                            type="radio"
                            checked={radioRow === t}
                            onClick={() => radioSelectRow(t)}
                          />
                        </td>
                      )
                    }
                    {
                      // 多选
                      checked && (
                        <td
                          style={{
                            textAlign: (align as any) || 'left',
                            cursor: 'pointer',
                          }}
                        >
                          <CheckBox
                            checked={checkedRow.indexOf(t) !== -1}
                            onChange={(check: boolean) =>
                              checkedSelectRow(check, t)
                            }
                          >
                            {checkedRow.indexOf(t) === -1}
                          </CheckBox>
                        </td>
                      )
                    }
                    {renderContentTd(t)}
                  </tr>
                  {t.openLine && (
                    <tr>
                      <td
                        style={{ textAlign: (align as any) || 'left' }}
                        colSpan={Object.keys(doTableData[0]).length + 1}
                      >
                        {t.openLine}
                      </td>
                    </tr>
                  )}
                </>
              );
            })
          }
        </tbody>
      );
    }
  };

  // table 虚拟列表渲染
  const tableVirtualListRender = () => {
    return (
      <div
        style={{
          height: `${
            data.length *
              (document.querySelector('.victurl-scroll-tr') as any)
                ?.offsetHeight -
            sTop
          }px`,
          transform: `translateY(${sTop}px)`,
          width: '100%',
        }}
      >
        <table>
          <thead>
            <tr>
              {(expandedRowRender || radio) && (
                <th style={{ textAlign: (align as any) || 'left' }} />
              )}
              {checked && (
                <th style={{ textAlign: (align as any) || 'left' }}>
                  <CheckBox
                    checked={checkedRow.length === doTableData.length}
                    onChange={(checked: boolean) => checkAll(checked)}
                  />
                </th>
              )}
              {doColumnData?.map((t, key) => {
                return (
                  <th
                    key={key}
                    style={tableStyle(t) as any}
                    className="tableHead"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: align || 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <span>{t.title}</span>
                      {t?.sorter && sortable && (
                        <div className="sort-icon">
                          <div
                            onClick={() => sortColumn(key, t, 2)}
                            style={sortIconStyle(t, 0)}
                          >
                            <CaretUpOutlined />
                          </div>
                          <div
                            onClick={() => sortColumn(key, t, 3)}
                            style={sortIconStyle(t, 1)}
                          >
                            <CaretDownOutlined />
                          </div>
                        </div>
                      )}
                      {t?.filter !== undefined && filter && (
                        <Popover
                          trigger="click"
                          placement="bottom"
                          style={{
                            width: '130px',
                          }}
                          content={
                            <div className="filter-dialog">
                              <Input
                                placeholder="请输入"
                                width="70"
                                onChange={(v: string) => handleIptChange(v, t)}
                              />
                              <div
                                className="search-btn"
                                onClick={() => filterList(t)}
                              >
                                <SearchOutlined />
                              </div>
                            </div>
                          }
                        >
                          <div className="search-th-btn">
                            <SearchOutlined />
                          </div>
                        </Popover>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{renderScrollList()}</tbody>
        </table>
      </div>
    );
  };

  // table 内容渲染
  const renderTableContent = () => {
    if (virtualized) {
      return tableVirtualListRender();
    } else if (lazyLoad || pagination) {
      return (
        <table>
          <thead>
            <tr>
              {(expandedRowRender || radio) && (
                <th style={{ textAlign: (align as any) || 'left' }} />
              )}
              {checked && (
                <th style={{ textAlign: (align as any) || 'left' }}>
                  <CheckBox
                    checked={checkedRow.length === doTableData.length}
                    onChange={(checked: boolean) => checkAll(checked)}
                  />
                </th>
              )}
              {doColumnData.map((t, key) => {
                return (
                  <th
                    key={key}
                    style={tableStyle(t) as any}
                    className="tableHead"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: align || 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <span>{t.title}</span>
                      {t?.sorter && sortable && (
                        <div className="sort-icon">
                          <div
                            onClick={() => sortColumn(key, t, 2)}
                            style={sortIconStyle(t, 0)}
                          >
                            <CaretUpOutlined />
                          </div>
                          <div
                            onClick={() => sortColumn(key, t, 3)}
                            style={sortIconStyle(t, 1)}
                          >
                            <CaretDownOutlined />
                          </div>
                        </div>
                      )}
                      {t?.filter !== undefined && filter && (
                        <Popover
                          trigger="click"
                          placement="bottom"
                          style={{
                            width: '130px',
                          }}
                          content={
                            <div className="filter-dialog">
                              <Input
                                placeholder="请输入"
                                width="70"
                                onChange={(v: string) => handleIptChange(v, t)}
                              />
                              <div
                                className="search-btn"
                                onClick={() => filterList(t)}
                              >
                                <SearchOutlined />
                              </div>
                            </div>
                          }
                        >
                          <div className="search-th-btn">
                            <SearchOutlined />
                          </div>
                        </Popover>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {tableContentRender()}
        </table>
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              {(expandedRowRender || radio) && (
                <th style={{ textAlign: (align as any) || 'left' }} />
              )}
              {checked && (
                <th style={{ textAlign: (align as any) || 'left' }}>
                  <CheckBox
                    checked={checkedRow.length === doTableData.length}
                    onChange={(checked: boolean) => checkAll(checked)}
                  />
                </th>
              )}
              {doColumnData.map((t, key) => {
                return (
                  <th
                    key={key}
                    style={tableStyle(t) as any}
                    className="tableHead"
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: align || 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <span>{t.title}</span>
                      {t?.sorter && sortable && (
                        <div className="sort-icon">
                          <div
                            onClick={() => sortColumn(key, t, 2)}
                            style={sortIconStyle(t, 0)}
                          >
                            <CaretUpOutlined />
                          </div>
                          <div
                            onClick={() => sortColumn(key, t, 3)}
                            style={sortIconStyle(t, 1)}
                          >
                            <CaretDownOutlined />
                          </div>
                        </div>
                      )}
                      {t?.filter !== undefined && filter && (
                        <Popover
                          trigger="click"
                          placement="bottom"
                          style={{
                            width: '130px',
                          }}
                          content={
                            <div className="filter-dialog">
                              <Input
                                placeholder="请输入"
                                width="70"
                                onChange={(v: string) => handleIptChange(v, t)}
                              />
                              <div
                                className="search-btn"
                                onClick={() => filterList(t)}
                              >
                                <SearchOutlined />
                              </div>
                            </div>
                          }
                        >
                          <div className="search-th-btn">
                            <SearchOutlined />
                          </div>
                        </Popover>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {tableNormalContentRender()}
        </table>
      );
    }
  };

  return (
    <div
      className={classNames}
      style={
        virtualized || lazyLoad
          ? {
              height: `${
                virtualListNum *
                (document.querySelector('.victurl-scroll-tr') as any)
                  ?.offsetHeight
              }px`,
              ...style,
            }
          : style
      }
    >
      <div
        className="table"
        style={
          virtualized || lazyLoad
            ? {
                maxHeight: `${
                  virtualListNum *
                  (document.querySelector('.victurl-scroll-tr') as any)
                    ?.offsetHeight
                }px`,
                overflowY: 'auto',
                // position: 'absolute',
                // top: '40px',
                // left: '0',
              }
            : {}
        }
        onScroll={(e) => scrollTable(e)}
        ref={scrollDom as any}
      >
        {renderTableContent()}
      </div>
      {pagination && (
        <div
          className="pagination"
          style={
            paginationAlign
              ? {
                  justifyContent: PaginationAlignMap[paginationAlign],
                }
              : {
                  justifyContent: 'flex-start',
                }
          }
        >
          <Pagination
            total={data.length}
            showSizeChanger
            pageSizeOptions={pageSizeOption || options}
            showQuickJumper
            onShowSizeChange={changePageSizeCallback}
            onChange={changePageCallback}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
